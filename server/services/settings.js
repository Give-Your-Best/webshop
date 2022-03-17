const Setting = require('../models/Setting');

const updateSetting = async (name, updateData) => {
    console.log('update settings service');
    try {
        const setting = await Setting.findOneAndUpdate({'name': name}, updateData);
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
            return setting
        } else {
          throw Error('Cannot find setting');
        }
      } catch (error) {
        console.error(`Error in getSetting: ${error}`);
        return { success: false, message: `Error in getSetting: ${error}` }
      }
};

module.exports = { 
  getSetting,
  updateSetting
};