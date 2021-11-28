require('dotenv').config();
const uuidv4 = require('uuid').v4;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/User');

const tokenForUser = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '15m', // expires in 15 minutes
  });
};

const setRefreshTokenCookie = (res) => {
  const refreshToken = uuidv4();
  //  setCookies(refreshToken)
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 12 * 60 * 60, // 12 hours
    signed: true, // access cookie later with req.signedCookies
    // httpOnly: true,
    sameSite: 'strict',
    // secure: COOKIES.SECURE,
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
      password: user.password,
    });
    // TODO pbb here set the cookie
    // todo still needed?
    setRefreshTokenCookie(res);
    return res.json({
      success: true,
      message: 'Enjoy your token!',
      user: { username: user.username, role: user.role },
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
  // 0. set refresh token as cookie
  // get refresh_token cookie
  // verify against db // ? how
  // create token for user
  // return res
  // alternatively:
  // 0. set the jwt token as a cookie
  // if token not in-memory
  // 1. call /refresh-token
  // 2. decrypt data from token
  // 3. log user in
  // maybe check if refresh_token cookie is present?
  // can there be another cross check?
  // 1. if(refresh_token): call /refresh-token -- else go to /login
  // 2. if refresh_token matches with the (?)
  // 3. log user in
  // 4. set new refresh token cookie
};

const authenticate = (req, res) => {
  // here check the cookie
  // and log them back in if all good
  // and call refreshToken()
  // so the client needs no awareness of the cookie at that stage, it just checks if the user + token is in state

  const token = req.body.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.decoded = decoded;
      console.log('++++huhhhh', decoded);
      return res.json({
        success: true,
        message: 'Authenticated!',
        user: { username: decoded.username, role: decoded.role },
        token,
      });
    } catch (err) {
      console.error(`Error in Authentication.authenticate() : ${err}`);
      return res
        .status(401)
        .send({
          success: false,
          message: `Failed to authenticate user. ${err}`,
        });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(400).send({
      success: false,
      message: 'Bad request.',
    });
  }
};

module.exports = {
  login,
  verifyToken,
  refreshToken,
  authenticate,
};
