const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//categories ["Dresses", "Knitwear", "Trousers", "Jeans", "Skirts", "Shorts", "Coats", "Jackets", "Tops", "Tshirts", "Sleepwear and Loungewear", "Accessories", "Shoes", "Other"]

const itemSchema = new Schema(
  {
    name: String,
    approvedStatus: {
      type: String,
      enum: ["in-progress", "approved", "rejected", "info-requested"],
      default : 'in-progress'
    },
    category: String,
    brand: String,
    description: String,
    size: {
      UK: String,
      EU: String,
    },
    frontPhotos: Array,
    backPhotos: Array,
    moreInfo: String,
    canWeContact: Boolean,
    colors: [String],
    status: {
      type: String,
      enum: ["in-shop", "shopped", "shipped", "received"],
      default : 'in-shop'
    }
  },
  { strict: false }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
