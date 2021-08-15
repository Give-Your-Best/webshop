const Item = require('../../models/ItemSchema');

const getAllItems = async () => {
  try {
    const items = await Item.find({}).lean();
    return items;
  } catch (error) {
    console.log('Error in getAllItems:', error);
  }
};

module.exports = {
  getAllItems,
};
