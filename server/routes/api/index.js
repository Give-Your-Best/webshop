const express = require('express');
const router = express.Router();
const itemsRoutes = require('./items');
const usersRoutes = require('./users');
const locationRoutes = require('./locations');
const settingsRoutes = require('./settings');
const rolesRoutes = require('./roles');
const tagsRoutes = require('./tags');
const mailerRoutes = require('./mail');
const messageRoutes = require('./messages');
const statisticsRoutes = require('./statistics');
const Authentication = require('../../controllers/authentication');
const Users = require('../../controllers/users');
const { getSetting } = require('../../services/settings');
const cloudinary = require('../../services/cloudinary');
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.send({ message: 'The Express backend is connected to React!' });
});

router.post('/register', Users.registerUser);

// get item endoint api/settings/:name
router.get('/settings/:name', async (req, res) => {
  const name = req.params.name;
  const setting = await getSetting(name);
  res.json(setting);
});

router.use('/items', itemsRoutes);
router.use('/auth', authRoutes);
router.use('/mail', mailerRoutes);

// api endpoints below this call will need to provide a token
router.use(Authentication.verifyToken);
router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/tags', tagsRoutes);
router.use('/locations', locationRoutes);
router.use('/settings', settingsRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/messages', messageRoutes);

// Provide signed url for secure upload etc. on the client
router.post('/cloudinary/signed_url', async (req, res) => {
  try {
    const signature = cloudinary.getSignedUrl(req.body);
    res.json(signature);
  } catch (e) {
    console.log('ERROR', e);
    res.status(400).json({ error: e });
  }
});

// Bulk resource deletion handler
router.post('/cloudinary/delete_resources', async (req, res) => {
  try {
    const { publicIds } = req.body;
    const result = await cloudinary.deleteResources(publicIds || []);
    res.json(result);
  } catch (e) {
    console.log('ERROR', e);
    res.status(400).json({ error: e });
  }
});

module.exports = router;
