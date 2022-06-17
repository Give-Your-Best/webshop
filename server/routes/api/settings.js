const express = require('express');
const router = express.Router();
const Settings = require('../../controllers/settings');
const { getAllSettings } = require('../../services/settings');

// get settings endpoint api/settings
router.get('/', async (req, res) => {
    const settings = await getAllSettings();
    res.json(settings);
});

// update item endpoint put to api/settings/:name
router.put('/:name', Settings.updateSetting);

module.exports = router;