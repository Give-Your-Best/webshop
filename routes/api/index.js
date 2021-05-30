const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'The Express backend is connected to React!' });
});

router.use('/items', require('./items'));
// router.use('/users', require('./users'));

module.exports = router;
