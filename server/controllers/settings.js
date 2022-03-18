require('dotenv').config();
const uuidv4 = require('uuid').v4;
const Setting = require('../models/Setting');
const SettingsService = require('../services/settings');

const updateSetting = async (req, res) => {
  console.log('update Setting controller');
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({message: "Service error: Setting details are required"});
  }
  const name = req.params.name,
        data = req.body;
  try {
    const response = await SettingService.updateSetting(name, data);
    return res.status(200).send({
      success: true,
      message: `Setting updated`,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }

};

module.exports = {
  updateSetting
};