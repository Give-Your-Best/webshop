const express = require('express');
const router = express.Router();
const Messages = require('../../controllers/messages');
const { getMessages } = require('../../services/messages');

// get users endpoint api/messages
router.get('/', async (req, res) => {
    let type = req.query.type || '';
    let userId = req.query.id || '';
    const messages = await getMessages(type, userId);
    res.json(messages);
});

// create location endpoint post to api/messages
router.post('/', Messages.createMessage);

// update item endpoint put to api/messages/:id
router.put('/:id', Messages.markMessageAsViewed);

module.exports = router;