const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/User');
const config = require('../config');

const tokenForUser = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: '24h', // expires in 24 hours
  });
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username, // username or email?
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
    return res.json({
      success: true,
      message: 'Enjoy your token!',
      user: user.username,
      token: token,
    });
  } catch (err) {
    console.log(`Error in Authentication.login() : ${err}`);
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
  console.log('oh lala', token);

  if (token) {
    try {
      // verifies secret and checks exp
      const decoded = jwt.verify(token, config.secret);
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    } catch (err) {
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

module.exports = {
  login,
  verifyToken,
};
