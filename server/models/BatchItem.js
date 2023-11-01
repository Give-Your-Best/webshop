const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchItemSchema = new Schema({
  itemIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const BatchItem = mongoose.model('BatchItem', batchItemSchema);

module.exports = BatchItem;
