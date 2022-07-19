const express = require('express');
const router = express.Router();
const Authentication = require('../../controllers/authentication');

// api/auth/login
router.post('/login', Authentication.login);

//api/auth/resetPassword
router.post('/passwordreset', Authentication.passwordReset);

// api/auth/authenticate
router.post('/authenticate', Authentication.authenticate);

// api/auth/refresh-token
// router.post('/refresh-token', Authentication.refreshToken);
router.use(Authentication.verifyToken);

//api/auth/updatepass
router.put('/updatepass', Authentication.updatePassword);

module.exports = router;
