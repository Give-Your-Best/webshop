const Item = require('../../models/Item');

const getAllItems = async () => {
  try {
    const items = await Item.find({}).lean();
    return items;
  } catch (error) {
    console.log('Error in getAllItems:', error);
    return [];
  }
};

module.exports = {
  getAllItems,
};
