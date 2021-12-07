const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
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
