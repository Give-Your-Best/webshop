const cloudinary = require('cloudinary').v2;
const config = require('../config/cloudinary');

cloudinary.config(config);

module.exports = { cloudinary };
