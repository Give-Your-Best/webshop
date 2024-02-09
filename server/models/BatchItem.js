const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchItemSchema = new Schema({
  templateItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  clothingSizes: {
    type: Map,
    of: Number,
    default: new Map(),
  },
  shoeSizes: {
    type: Map,
    of: Number,
    default: new Map(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const BatchItem = mongoose.model('BatchItem', batchItemSchema);

module.exports = BatchItem;
