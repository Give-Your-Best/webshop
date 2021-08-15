const { items } = require('../../mockData/items');

const getAllItems = () => {
  console.log('getAllItems', items);
  return items;
};

module.exports = {
  getAllItems,
};
