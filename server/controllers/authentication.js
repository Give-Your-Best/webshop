require('dotenv').config();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/User');

const tokenForUser = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '15m', // expires in 15 minutes
  });
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

module.exports = {
  login,
  verifyToken,
};
