const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
});
  
//export
module.exports = mongoose.model('Location', locationSchema);