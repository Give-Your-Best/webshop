const cloudinary = require('cloudinary');
const config = require('../config/cloudinary');

cloudinary.config(config);

module.exports = { cloudinary };
