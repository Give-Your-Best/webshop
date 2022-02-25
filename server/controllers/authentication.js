require('dotenv').config();
const uuidv4 = require('uuid').v4;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/User');

const tokenForUser = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '24h', // expires in 24 hours // TODO: reduce to 15min and introduce auth flow with refresh token
  });
};

const setRefreshTokenCookie = (res) => {
  const refreshToken = uuidv4();
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 12 * 60 * 60, // 12 hours
    signed: true, // access cookie later with req.signedCookies
    sameSite: 'strict',
  });

  return refreshToken;
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
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
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    const token = tokenForUser({
      _id: user._id,
      username: user.username,
      // password: user.password, // do not use password here since we're saving this to the cookies
    });
    setRefreshTokenCookie(res); // currently not used
    return res.json({
      success: true,
      message: 'Enjoy your token!',
      user: { username: user.username, role: user.role, id: user._id },
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
    const user = await User.findById(decoded._id);
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: 'Authentication failed.' });
    }
    req.decoded = decoded;
    return res.json({
      success: true,
      message: 'Authenticated!',
      user: { username: user.username, role: user.role },
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

module.exports = {
  login,
  verifyToken,
  refreshToken,
  authenticate,
};
