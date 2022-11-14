require('dotenv').config();
const uuidv4 = require('uuid').v4;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User_ = require('../models/User');
const Item = require('../models/Item');
const Mail = require('../services/mail');

const today = new Date();
var sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

const tokenForUser = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '24h', // expires in 24 hours // TODO: reduce to 15min and introduce auth flow with refresh token
  });
};

const setRefreshTokenCookie = (res) => {
  console.log('refresh token cookie')
  const refreshToken = uuidv4();
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 12 * 60 * 60, // 12 hours
    signed: true, // access cookie later with req.signedCookies
    sameSite: 'strict'
  });

  return refreshToken;
};

const setUserDetails = (user) => {
  let UserDetails = { 
    email: user.email, 
    type: user.kind || 'no-access', 
    id: user._id, 
    firstName: user.firstName, 
    lastName: user.lastName,
    recentItems: user.recentItems || [],
    deliveryAddress: user.deliveryAddress || {}
  }

  if (user.kind === 'donor') {
    UserDetails.trustedDonor = user.trustedDonor || false
  }

  if (user.kind === 'shopper') {
    UserDetails.deliveryAddress = user.deliveryAddress || {}
    UserDetails.deliveryPreference = user.deliveryPreference || 'direct'
    UserDetails.shoppingFor = user.shoppingFor || 1
    UserDetails.shoppingForChildren = user.shoppingForChildren || 0
  }

  return UserDetails
}

const name = (userDetails) => {
  if (userDetails.firstName && userDetails.lastName) {
      return userDetails.firstName + ' ' + userDetails.lastName
  } else if (userDetails.firstName && !userDetails.lastName) {
      return userDetails.firstName
  } else if (!userDetails.firstName && userDetails.lastName) {
      return userDetails.lastName
  } else {
      return userDetails.email
  }
}

const login = async (req, res) => {
  try {
    const user = await User_.User.findOne({
      email: req.body.email,
      approvedStatus: 'approved'
    });

    if ( user && user.kind === 'shopper') {
      const recentItems = await Item.find({
        'shopperId': user._id,
        'statusUpdateDates.shoppedDate': {
          $gte: new Date(sevenDaysAgo),
          $lte: new Date(today)
        }
      });
      if (recentItems) {
        user.recentItems = recentItems;
      }
    }
    
    if (!user) {
      console.log('no user found')
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    // check if passwords match
    const isMatch = await user.comparePassword(
      req.body.password,
      user.password
    );
    if (!isMatch) {
      console.log('incorrect pass')
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    const token = tokenForUser({
      _id: user._id,
      email: user.email
    });
    setRefreshTokenCookie(res); // currently not used

    return res.json({
      success: true,
      message: 'Enjoy your token!',
      user: setUserDetails(user),
      token,
    });
  } catch (err) {
    console.error(`Error in Authentication.login() : ${err}`);
    return res.json({
      success: false,
      message: `Something went wrong: ${err}`,
    });
  }
};

const passwordReset = async (req, res) => {
  const temp = Math.random().toString(36).slice(2, 10);

  try {
    const user = await User_.User.findOne({
      email: req.body.email,
      approvedStatus: 'approved'
    });

    if (!user) {
      console.log('no user found')
      return res
        .status(401)
        .send({ success: false, message: 'No account found.' });
    }

    try {
      //update user password with temp
      await user.updatePassword(user._id, temp);
      //send email with new password
      await Mail.sendMail('', req.body.emailContent.replace('{{name}}', name(user)).replace('{{password}}', temp), req.body.email, name(user));

      return res.json({
        success: true,
        message: 'password updated!'
      });
    } catch (err) {
      return res.json({
        success: false,
        message: 'password failed to update'
      });
    }
  } catch (err) {
    console.error(`Error in Authentication.updatePassword() : ${err}`);
    return res.json({
      success: false,
      message: `Something went wrong: ${err}`,
    });
  }

}

const verifyToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    try {
      // verifies secret and checks exp
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    } catch (err) {
      console.error(`Error in Authentication.verifyToken() : ${err}`);
      return res
        .status(401)
        .send({ success: false, message: 'Failed to authenticate token.' });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

const refreshToken = (req, res, next) => {
  // set refresh token as cookie
  // get refresh_token cookie
  // verify against db
  // create jwt & refresh tokens
  // return res & restart countdown to next refresh token req
  // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_structure
};

const authenticate = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).send({
      success: false,
      message: 'Bad request.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .send({ success: false, message: 'Failed to authenticate user.' });
    }
    const user = await User_.User.findById(decoded._id);
    if (!user || user.approvedStatus != 'approved') {
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    req.decoded = decoded;

    if ( user && user.kind === 'shopper') {
      const recentItems = await Item.find({
        'shopperId': user._id,
        'statusUpdateDates.shoppedDate': {
          $gte: new Date(sevenDaysAgo),
          $lte: new Date(today)
        }
      });
      if (recentItems) {
        user.recentItems = recentItems;
      }
    }

    return res.json({
      success: true,
      message: 'Authenticated!',
      user: setUserDetails(user),
      token,
    });
  } catch (err) {
    console.error(`Error in Authentication.authenticate() : ${err}`);
    return res.status(401).send({
      success: false,
      message: `Failed to authenticate user. ${err}`,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User_.User.findOne({
      email: req.body.email,
      approvedStatus: 'approved'
    });

    if (!user) {
      console.log('no user found')
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    // check if passwords match
    const isMatch = await user.comparePassword(
      req.body.oldPassword,
      user.password
    );
    if (!isMatch) {
      console.log('Incorrect current password')
      return res
        .status(401)
        .send({ success: false, message: 'Incorrect current password' });
    }

    try {
      const update = await user.updatePassword(req.body.id, req.body.newPassword);
      return res.json({
        success: true,
        message: 'password updated!'
      });
    } catch (err) {
      return res.json({
        success: false,
        message: 'password failed to update'
      });
    }
  } catch (err) {
    console.error(`Error in Authentication.updatePassword() : ${err}`);
    return res.json({
      success: false,
      message: `Something went wrong: ${err}`,
    });
  }

}

module.exports = {
  login,
  verifyToken,
  refreshToken,
  authenticate,
  updatePassword,
  passwordReset
};
