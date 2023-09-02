const mongoose = require('mongoose');
const BSON = require('bson');

const Schema = mongoose.Schema;
const options = { timestamps: true };

const messageItem = {
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
};

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
    messages: [messageItem],
  },
  options
);

// TODO - ALSO RENAME THIS !!! (getUnreadCountByThread ??, getThreadCounts ??)
messageSchema.statics.countUnreadMessages = async function (user) {
  console.log({ user });
  const { kind } = user;

  const $match = {
    ...(kind === 'admin' ? {} : { user: user._id }),
  };

  const $project = {
    threadId: '$_id',
    userType: '$type',
    messages: { $size: '$messages' },
    unviewed: {
      $size: {
        $filter: {
          input: '$messages',
          cond: {
            $eq: ['$$this.viewed', false],
          },
        },
      },
    },
  };

  const data = await this.aggregate([
    {
      $match,
    },
    {
      $project,
    },
  ]);

  return data;
};

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
messageSchema.statics.getThread = async function (threadId, user) {
  const thread = await this.findOne({ threadId, user })
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return thread;
};

// TODO
messageSchema.statics.upsertThread = async function (data) {
  const threadId = data.threadId || new BSON.ObjectId();

  const { messages, ...rest } = data;

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
