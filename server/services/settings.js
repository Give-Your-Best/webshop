const Setting = require('../models/Settings');

const updateSetting = async (name, data) => {
    console.log('update settings service');
    try {
        const setting = await Setting.findOneAndUpdate({'name': name}, data, { useFindAndModify: false });
        if (setting) {
            return { success: true, message: 'setting updated' }
        } else {
          throw Error('Cannot update setting');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};


const getSetting = async (name) => {
    console.log('get setting')
    try {
        const setting = await Setting.find({'name': name});
        if (setting) {
            return setting.value
        } else {
          throw Error('Cannot find setting');
        }
      } catch (error) {
        console.error(`Error in getSetting: ${error}`);
        return { success: false, message: `Error in getSetting: ${error}` }
      }
};

const getAllSettings = async () => {
  try {
    var settings = await Setting.find({}).lean();
    return settings;
  } catch (error) {
    console.error(`Error in getAllsettings: ${error}`);
    return { success: false, message: `Error in getAllsettings: ${error}` }
  }
};

module.exports = { 
  getSetting,
  updateSetting,
  getAllSettings
};