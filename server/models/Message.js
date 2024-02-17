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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [
      {
        message: String,
        recipient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        viewed: {
          type: Boolean,
          default: false,
        },
        sentDate: Date,
      },
    ],
    archived: {
      type: Boolean,
      required: false,
    },
  },
  options
);

//export
module.exports = mongoose.model('Message', messageSchema);
