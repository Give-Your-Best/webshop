const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String,
});
  
//export
module.exports = mongoose.model('Tag', tagSchema);