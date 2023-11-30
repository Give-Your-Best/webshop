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
});

const BatchItem = mongoose.model('BatchItem', batchItemSchema);

module.exports = BatchItem;
