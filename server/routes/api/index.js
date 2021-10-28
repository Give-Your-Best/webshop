const express = require('express');
const router = express.Router();
const Authentication = require('../../controllers/authentication');

router.get('/', (req, res) => {
  res.send({ message: 'The Express backend is connected to React!' });
});
router.use('/items', require('./items'));
router.use('/auth', require('./auth'));

// api endpoints below this call will need to provide a token
router.use(Authentication.verifyToken);
router.use('/test-auth-items', require('./items'));

module.exports = router;
