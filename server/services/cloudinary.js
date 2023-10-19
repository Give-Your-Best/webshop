const cloudinary = require('cloudinary').v2;
const { apiKey, apiSecret, cloudName } = require('../config/cloudinary');

cloudinary.config({
  api_key: apiKey,
  api_secret: apiSecret,
  cloud_name: cloudName,
  secure: true, // https
});

/**
 * Generate a signed url for secure authenticated actions on the client.
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
    cloudname: cloudName,
    apikey: apiKey,
  };
};

/**
 * Batch delete resources via the admin api.
 * https://cloudinary.com/documentation/admin_api#delete_resources
 */
const deleteResources = async (publicIds) => {
  const result = await cloudinary.api.delete_resources(publicIds);

  return result;
};

module.exports = {
  deleteResources,
  getSignedUrl,
};
