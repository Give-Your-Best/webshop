const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const options = { timestamps: true };

const messageSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['donor', 'shopper'],
    },
    threadId: String,
    subject: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [
      {
        message: String,
        recipient: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        viewed: {
          type: Boolean,
          default: false,
        },
        sentDate: Date,
      },
    ],
  },
  options
);

//export
module.exports = mongoose.model('Message', messageSchema);
