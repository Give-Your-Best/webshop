const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User_ = require('./User');

//categories ["Dresses", "Knitwear", "Trousers", "Jeans", "Skirts", "Shorts", "Coats", "Jackets", "Tops", "Tshirts", "Sleepwear and Loungewear", "Accessories", "Shoes", "Other"]

const options = { strict: false, timestamps: true };

const itemSchema = new Schema(
  {
    name: String,
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BatchItem',
      default: null,
    },
    isTemplateBatchItem: {
      type: Boolean,
      default: false,
    },
    approvedStatus: {
      type: String,
      enum: ['in-progress', 'approved', 'rejected'],
      default: 'in-progress',
    },
    category: String,
    brand: String,
    description: String,
    clothingSize: [String],
    shoeSize: [String],
    photos: [
      {
        url: String,
      },
    ],
    moreInfo: String,
    colors: [String],
    status: {
      type: String,
      enum: [
        'in-shop',
        'shopped',
        'shipped-to-gyb',
        'received-by-gyb',
        'shipped-to-shopper',
        'received',
        'empty', // used for the template item of a batch-item to indicate that the batch-item is empty
      ],
      // in-shop then shopped when a shopper selects it. shipped-to-gyb and received-by-gyb only used if shopper is sending via gyb
      default: 'in-shop',
    },
    statusUpdateDates: {
      shoppedDate: Date,
      gybShippedDate: Date,
      gybReceivedDate: Date,
      gybAssignedDate: Date,
      shopperShippedDate: Date,
      shopperReceivedDate: Date,
      inBasketDate: Date,
    },
    shopperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sendVia: {
      type: mongoose.Schema.Types.ObjectId, //if shopper selected send via gyb then location is
      ref: 'Location',
    },
    inBasket: Boolean,
    live: {
      type: Boolean,
      default: true,
    },
    tags: [{ type: Schema.ObjectId, ref: 'Tag' }],
    packageId: {
      type: String,
      default: '',
    },
  },
  options
);

itemSchema.post('update', function () {
  this.getUpdate().$set;
});

itemSchema.index({ batchId: 1 });
itemSchema.index({ isTemplateBatchItem: 1 });
itemSchema.index({ tags: 1 });
itemSchema.index({ shopperId: 1 });

// Before saving set approved status to approved if donor is a trusted donor (default is in-progress)
itemSchema.pre('save', async function (next) {
  const item = this;
  var donor = await User_.User.findOne({
    _id: item.donorId,
  });
  if (donor.trustedDonor) {
    this.approvedStatus = 'approved';
  }
  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
