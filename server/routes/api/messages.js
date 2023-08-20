const express = require('express');
const router = express.Router();
const Messages = require('../../controllers/messages');

// get messages endpoint api/messages
router.get('/', Messages.getMessages);

// create message endpoint post to api/messages
router.post('/', Messages.createMessage);

// update message endpoint put to api/messages/:id
router.put('/:id', Messages.markMessageAsViewed);

module.exports = router;
