const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
  {
    name: String,
    value: String,
  },
);

const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;

// db.settings.insertMany([
//   { name: "shop_email", value: "me@zahraweb.uk"},
//   { name: "shopItemLimit", value: "1"},
//   { name: "trustedDonorLimit", value: "3"}
// ])