require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'hnlrfgzzh', 
  api_key: '774978573831789', 
  api_secret: 'DpKJkPpBz1JoXqWkSMTyucSaOSI' 
});

module.exports = { cloudinary };