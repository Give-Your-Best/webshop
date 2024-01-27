const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * e.g.
 * {
 *    "message": "Please note!",
 *    "description": "Our team are on a break for the festive season.",
 *    "type": "info"
 * }
 */

const bannerAlertSchema = new Schema({
  type: {
    type: String,
    enum: ['success', 'info', 'warning', 'error'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const BannerAlert = mongoose.model('Banners', bannerAlertSchema);

module.exports = BannerAlert;
