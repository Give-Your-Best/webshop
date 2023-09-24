const cloudinary = require('cloudinary').v2;
const { apiKey, apiSecret, cloudName } = require('../config/cloudinary');

cloudinary.config({
  api_key: apiKey,
  api_secret: apiSecret,
  cloud_name: cloudName,
  secure: true, // https
});

/**
 * Generate a signed url for secure authenticated actions on the client (without
 * exposing any secret). See the cloudinary documentation here:
 * https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
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
    // Return the cloudinary account name and api key for use in building urls
    // etc. on the client
    cloudname: cloudName,
    apikey: apiKey,
  };
};

module.exports = {
  getSignedUrl,
};
