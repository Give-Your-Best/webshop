const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const options = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const tagSchema = new Schema(
  {
    name: String,
  },
  options
);

tagSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'tags',
});

tagSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'tags',
});

//export
module.exports = mongoose.model('Tag', tagSchema);
