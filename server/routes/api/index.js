const express = require('express');
const router = express.Router();
const itemsRoutes = require('./items');
const usersRoutes = require('./users');
const Authentication = require('../../controllers/authentication');
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.send({ message: 'The Express backend is connected to React!' });
});
router.use('/items', itemsRoutes);
router.use('/auth', authRoutes);

// api endpoints below this call will need to provide a token
router.use(Authentication.verifyToken);
router.use('/users', usersRoutes);

module.exports = router;
