const express = require('express');
const router = express.Router();
const itemsRoutes = require('./items');
const usersRoutes = require('./users');
const locationRoutes = require('./locations');
const Authentication = require('../../controllers/authentication');
const Users = require('../../controllers/users');
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.send({ message: 'The Express backend is connected to React!' });
});

// sign up user endpoint post to api/users
router.post('/register', Users.registerUser);

router.use('/items', itemsRoutes);
router.use('/auth', authRoutes);
router.use('/locations', locationRoutes);

// api endpoints below this call will need to provide a token
router.use(Authentication.verifyToken);
router.use('/users', usersRoutes);

module.exports = router;
