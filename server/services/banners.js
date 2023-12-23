const BannerAlert = require('../models/Banners');

const getAllBanners = async () => {
  try {
    const banners = await BannerAlert.find({}).lean();
    return banners;
  } catch (error) {
    console.error(`Error in getAllBanners: ${error}`);
    return [];
  }
};

module.exports = {
  getAllBanners,
};
