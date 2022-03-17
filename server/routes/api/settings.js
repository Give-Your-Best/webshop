const express = require('express');
const router = express.Router();
const Settings = require('../../controllers/settings');
const { getSetting } = require('../../services/settings');

// get item endoint api/settings/:name
router.get('/:name', async (req, res) => {
    const name = req.params.id;
    const setting = await getSetting(name);
    res.json(setting);
});

// update item endpoint put to api/settings/:name
router.put('/:name', Items.updateSetting);

module.exports = router;