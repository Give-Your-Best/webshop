const Message = require('../models/Message');
const BSON = require('bson');

const getMessages = async (type, userId) => {
  try {
    if (userId === 'all') { //if all then admin user viewing all messages by user type

      let values = {type: type}
      const messages = await Message.find(values).populate('user').populate('messages.sender').populate('messages.recipient');
      return messages;

    } else if (userId!== '') { //if userId exists then get messages for individual user

      let values = {user: userId}
      const messages = await Message.find(values).populate('user').populate('messages.sender').populate('messages.recipient');

      return messages;
    }
  } catch (error) {
    console.error(`Error in getMessages: ${error}`);
    return { success: false, message: `Error in getMessages: ${error}` }
  }
};


const markMessageAsViewed = async (id, messageIds) => {
  console.log('update messages service');
  try {
      const thread = await Message.findOneAndUpdate({'_id': id, 'messages._id': { $in: messageIds }},{$set: {"messages.$.viewed": true}}, { useFindAndModify: false, returnDocument: 'after'});
      if (thread) {
        console.log(thread)
          return { success: true, message: 'marked as viewed', thread: thread }
      } else {
        throw Error('Cannot update message');
      }
  } catch (err) {
      console.log(err);
      return { success: false, message: err }
  }
};

const createMessage = async (data) => {
  console.log('create message service');
  console.log(data);
  if (!data.threadId || data.threadId === '') {
    //if no thread id then add a new one
    data.threadId = new BSON.ObjectId();
  } else {
    let updateData = {
      'viewed': false,
      'sender': data.sender,
      'recipient': data.recipient,
      'sentDate': data.sentDate,
      'message': data.message,
  }
    const thread = await Message.findOneAndUpdate({"threadId": data.threadId}, {$push: { messages: updateData }}, { useFindAndModify: false, returnDocument: 'after' }).then(t => t.populate('user').populate('messages.sender').populate('messages.recipient').execPopulate());
    if (thread) {
          return {success: true, message: 'Message sent',  thread: thread}
    } else {
      throw Error('Cannot send message');
    }
  }
  try {
      const message = new Message(data)
      let saveMessage = await message.save().then(t => t.populate('user').populate('messages.sender').populate('messages.recipient').execPopulate());
      return { success: true, message: `message created`, thread: saveMessage }
  } catch (err) {
      console.error(err);
      return { success: false, message: err }
  }
};


module.exports = { 
  getMessages,
  createMessage,
  markMessageAsViewed
};