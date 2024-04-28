const BSON = require('bson');
const moment = require('moment');
const Message = require('../models/Message');

// Archive many...
const archiveThreads = async (threadIds) => {
  await Message.updateMany(
    { threadId: { $in: threadIds } },
    { $set: { archived: true } }
  );
};

// Marking a message thread archived will prevent it appearing in the default
// view for admin messages. Archived threads will be accessible by a specific
// view. Archived threads are also candidates for deletion...
const toggleArchived = async (threadId, archived) => {
  const thread = await Message.findOneAndUpdate(
    { threadId },
    { $set: { archived } },
    { new: true }
  );
  if (thread) {
    return { success: true, message: 'status updated', thread: thread };
  } else {
    throw Error('Cannot update thread');
  }
};

// Only archived threads can be deleted.
const deleteThread = async (threadId) => {
  const thread = await Message.findOneAndDelete({ threadId, archived: true });
  if (thread) {
    return { success: true, message: 'thread deleted', thread: thread };
  } else {
    throw Error('Cannot delete thread');
  }
};

// Find all threads neither active in the last six months nor archived.
const getStaleThreads = async () => {
  // Formatted date exactly 6 months ago
  const date = moment().subtract(6, 'months').format('YYYY-MM-DD');

  // We only want threads where the archived property has not yet been set -
  // this will distinguish them from previously archived threads that have been
  // deliberately unarchived...
  const threads = await Message.find(
    {
      updatedAt: { $lt: date },
      archived: { $exists: false },
    },
    'threadId'
  );

  return threads;
};

// Admin users want to see all messages for a type of user - they can chose to
// view only the archived threads if desired...
const getAdminThreads = async (type, archived) => {
  const conditions = archived
    ? { type, archived }
    : { type, $or: [{ archived: { $exists: false } }, { archived: false }] };

  const threads = await Message.find(conditions)
    .populate('user')
    .populate('messages.sender')
    .populate('messages.recipient')
    .sort({ updatedAt: -1 });

  return threads;
};

// End users (shopper or donor) get to see only their own exchanges with the
// admins - we do not yet provide a distinct 'archived' view utility on the UI
// for these users but should do soon...
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
    $or: [{ archived: { $exists: false } }, { archived: false }],
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
  getThreadSummaries,
  upsertThread,
  archiveThreads,
  toggleArchived,
  deleteThread,
  getStaleThreads,
  getAdminThreads,
  getUserThreads,
  getMessages,
  createMessage,
  markMessageAsViewed,
};
