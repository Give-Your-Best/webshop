require('dotenv').config();
const Message = require('../models/Message');
const MessagesService = require('../services/messages');

const pusher = require('../utils/pusher');

const createMessage = async (req, res) => {
  if (!req.body.messages && !req.body.message) {
    return res.status(400).send({ message: 'Service error: Message is empty' });
  }

  try {
    const thread = await Message.upsertThread(req.body);
    const message = [...thread.messages].pop();

    console.log('REQ.SOC', req.socket_id);

    pusher.trigger(
      [`notify@${thread.user._id}`, 'notify@admin'],
      'NEW_MESSAGE',
      {
        threadId: thread.threadId,
        sender: message.sender.id,
        user: thread.user.id,
        type: thread.type,
      }
    );

    return res.status(200).send({
      success: true,
      message: 'message created',
      thread: thread || {},
    });
  } catch (err) {
    req.bugsnag.notify(err);
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

// TODO - need to check that this is protected - is it possible for anyone
// logged-in to access messages of type x?
const getMessages = async (req, res) => {
  if (!req.query.id && !req.query.type) {
    return res.status(400).send({ message: 'Service error: invalid request' });
  }

  try {
    const { type, id: user } = req.query;

    const threads =
      user === 'all'
        ? await Message.getAllOfType(type)
        : await Message.getAllForUser(user);

    res.json(threads);
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const markMessageAsViewed = async (req, res) => {
  if (req.body.length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: message details are required' });
  }
  const id = req.params.id,
    messageIds = req.body.messageIds;
  try {
    const response = await MessagesService.markMessageAsViewed(id, messageIds);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      thread: response.thread,
    });
  } catch (err) {
    req.bugsnag.notify(err);
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

module.exports = {
  createMessage,
  getMessages,
  markMessageAsViewed,
};
