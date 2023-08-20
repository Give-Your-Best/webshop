const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BSON = require('bson');
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

// TODO
messageSchema.statics.getAllOfType = async function (type) {
  const threads = await this.find({ type })
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return threads;
};

// TODO
messageSchema.statics.getAllForUser = async function (user) {
  const threads = await this.find({ user })
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return threads;
};

// TODO
messageSchema.statics.upsertThread = async function (data) {
  const threadId = data.threadId || new BSON.ObjectId();

  const { sender, recipient, sentDate, message, viewed, ...rest } = data;

  const messages = {
    message,
    recipient,
    sender,
    sentDate,
    viewed: false,
  };

  const thread = await this.findOneAndUpdate(
    { threadId },
    { ...rest, $push: { messages } },
    { new: true, upsert: true, useFindAndModify: false }
  );

  return thread
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .execPopulate();
};

//export
module.exports = mongoose.model('Message', messageSchema);
