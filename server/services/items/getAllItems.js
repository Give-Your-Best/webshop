const Item = require('../../models/ItemSchema');

const getAllItems = async () => {
  const items = await Item.find({}).lean();
  return items;
};

module.exports = {
  getAllItems,
};
