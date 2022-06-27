require('dotenv').config();
const MessagesService = require('../services/messages');

const createMessage = async (req, res) => {
  console.log('create message controller')
  console.log(req.body);
  if (!req.body.messages && !req.body.message) {
    return res.status(400).send({message: "Service error: Message is empty"});
  }

  try {
    const response = await MessagesService.createMessage(req.body);
    console.log(response)
    return res.status(200).send({
      success: true,
      message: `message created`,
      thread: response.thread  || {}
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }
};

const markMessageAsViewed = async (req, res) => {
  console.log('update message controller');
  console.log(req.body)
  if (req.body.length === 0) {
    return res.status(400).send({message: "Service error: message details are required"});
  }
  const id = req.params.id,
        messageIds = req.body.messageIds;
    console.log(messageIds)
  try {
    const response = await MessagesService.markMessageAsViewed(id, messageIds);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      thread: response.thread
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }

};


module.exports = {
  createMessage,
  markMessageAsViewed
};