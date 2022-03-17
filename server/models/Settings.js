const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
  {
    shop_email: String,
    shopItemLimit: Number
  },
);

const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;
