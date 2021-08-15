const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    size: {
      UK: String,
      EU: String,
    },
    photos: Array,
    colors: [String],
    status: String,
    country: String,
  },
  { strict: false }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
