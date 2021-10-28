const express = require('express');
const router = express.Router();
const Authentication = require('../../controllers/authentication');

// api/auth/login
router.post('/login', Authentication.login);
router.use(Authentication.verifyToken);
// router.post('/create-admin', Authentication.createAdmin);

module.exports = router;
