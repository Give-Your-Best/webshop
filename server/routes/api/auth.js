const express = require('express');
const router = express.Router();
const Authentication = require('../../controllers/authentication');

// api/auth/login
router.post('/login', Authentication.login);
// api/auth/authenticate
router.post('/authenticate', Authentication.authenticate);
// api/auth/refresh-token
// router.post('/refresh-token', Authentication.refreshToken);
router.use(Authentication.verifyToken);
// router.post('/create-admin', Authentication.createAdmin); // TODO

module.exports = router;
