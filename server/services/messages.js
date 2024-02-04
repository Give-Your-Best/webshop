const Message = require('../models/Message');
const BSON = require('bson');

// TODO
const getAdminThreads = async (type) => {
  const threads = await Message.find({ type })
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return threads;
};

// TODO
const getUserThreads = async (user) => {
  const threads = await Message.find({ user })
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return threads;
};

// TODO
const getThreadSummaries = async (user) => {
  const { kind } = user;

  const $match = {
    ...(kind === 'admin' ? {} : { user: user._id }),
  };

  const $project = {
    _id: 0,
    threadId: '$threadId',
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

  const data = await Message.aggregate([
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
const markMessageAsViewed = async (id, messageIds) => {
  try {
    const thread = await Message.findOneAndUpdate(
      { _id: id, 'messages._id': { $in: messageIds } },
      { $set: { 'messages.$.viewed': true } },
      { new: true }
    );
    if (thread) {
      return { success: true, message: 'marked as viewed', thread: thread };
    } else {
      throw Error('Cannot update message');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

// TODO
const upsertThread = async (data) => {
  const threadId = data.threadId || new BSON.ObjectId();

  const { messages, ...rest } = data;

  const thread = await Message.findOneAndUpdate(
    { threadId },
    { ...rest, $push: { messages } },
    { new: true, upsert: true }
  )
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .exec();

  return thread;
};

/**
 * DEPRECATED...
 */
const getMessages = async (type, userId) => {
  try {
    if (userId === 'all') {
      //if all then admin user viewing all messages by user type

      let values = { type: type };
      const messages = await Message.find(values)
        .populate('user')
        .populate('messages.sender')
        .populate('messages.recipient')
        .sort({ updatedAt: -1 });
      return messages;
    } else if (userId !== '') {
      //if userId exists then get messages for individual user

      let values = { user: userId };
      const messages = await Message.find(values)
        .populate('user')
        .populate('messages.sender')
        .populate('messages.recipient')
        .sort({ updatedAt: -1 });

      return messages;
    }
  } catch (error) {
    console.error(`Error in getMessages: ${error}`);
    return { success: false, message: `Error in getMessages: ${error}` };
  }
};

/**
 * DEPRECATED...
 */
const createMessage = async (data) => {
  if (!data.threadId || data.threadId === '') {
    //if no thread id then add a new one
    data.threadId = new BSON.ObjectId();
  } else {
    let updateData = {
      viewed: false,
      sender: data.sender,
      recipient: data.recipient,
      sentDate: data.sentDate,
      message: data.message,
    };
    const thread = await Message.findOneAndUpdate(
      { threadId: data.threadId },
      { $push: { messages: updateData } },
      { new: true }
    )
      .populate('user')
      .populate('messages.sender')
      .populate('messages.recipient')
      .exec();

    if (thread) {
      return { success: true, message: 'Message sent', thread: thread };
    } else {
      throw Error('Cannot send message');
    }
  }
  try {
    const message = await Message.create(data);

    const thread = await Message.findById(message._id)
      .populate('user')
      .populate('messages.sender')
      .populate('messages.recipient')
      .exec();

    return { success: true, message: `message created`, thread: thread };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

module.exports = {
  getAdminThreads,
  getUserThreads,
  getThreadSummaries,
  upsertThread,

  getMessages,
  createMessage,
  markMessageAsViewed,
};
