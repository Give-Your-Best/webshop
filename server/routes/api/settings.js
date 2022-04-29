const express = require('express');
const router = express.Router();
const Settings = require('../../controllers/settings');
const { getSetting, getAllSettings } = require('../../services/settings');

// get settings endpoint api/settings
router.get('/', async (req, res) => {
    const settings = await getAllSettings();
    res.json(settings);
});

// get item endoint api/settings/:name
router.get('/:name', async (req, res) => {
    const name = req.params.name;
    const setting = await getSetting(name);
    res.json(setting);
});

// update item endpoint put to api/settings/:name
router.put('/:name', Settings.updateSetting);

module.exports = router;