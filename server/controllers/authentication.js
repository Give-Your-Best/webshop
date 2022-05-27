require('dotenv').config();
const uuidv4 = require('uuid').v4;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Role = require('../models/Role');
const User_ = require('../models/User');
const Item = require('../models/Item');
const UserService = require('../services/users');

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

const login = async (req, res) => {
  console.log('login fn')
  console.log(req.body)
  try {
    const user = await User_.User.findOne({
      email: req.body.email,
      approvedStatus: 'approved'
    }).populate('assignedRole');

    if ( user && user.kind === 'shopper') {
      const recentItems = await Item.find({
        'shopperId': user._id,
        'statusUpdateDates.shoppedDate': {
          $gte: new Date(sevenDaysAgo),
          $lte: new Date(today)
        }
      });
      if (recentItems) {
        console.log('recent')
        console.log(recentItems)
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
      email: user.email,
      // password: user.password, // do not use password here since we're saving this to the cookies
    });
    setRefreshTokenCookie(res); // currently not used
    return res.json({
      success: true,
      message: 'Enjoy your token!',
      user: { 
        email: user.email, 
        type: user.kind || 'no-access', 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        recentItems: user.recentItems || [],
        deliveryAddress: user.deliveryAddress || {}
      },
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

const verifyToken = (req, res, next) => {
  console.log('verifying token')
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
    return res.json({
      success: true,
      message: 'Authenticated!',
      user: { email: user.email, type: user.kind, id: user._id },
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
  console.log('update pass controller');
  console.log(req.body)
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
  updatePassword
};
