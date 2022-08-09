const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const options = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}

const locationSchema = new Schema({
  name: String,
  firstLine: String,
  secondLine: String,
  postcode: String,
  city: String,
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  available: Boolean
}, options);

locationSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'sendVia',
  count: true,
  match: { status: { $in: ["shopped", "shipped-to-gyb", "received-by-gyb"]} }
});
  
//export
module.exports = mongoose.model('Location', locationSchema);