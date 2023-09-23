const cloudinary = require('cloudinary').v2;
const { apiKey, apiSecret, cloudName } = require('../config/cloudinary');

cloudinary.config({
  api_key: apiKey,
  api_secret: apiSecret,
  cloud_name: cloudName,
  secure: true, // https
});

/**
 * TODO...
 */
const getSignedUrl = (options) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      ...options,
    },
    apiSecret
  );

  return {
    signature,
    timestamp,
    cloudname: cloudName,
    apikey: apiKey,
  };
};

module.exports = {
  getSignedUrl,
};
