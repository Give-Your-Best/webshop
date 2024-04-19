const express = require('express');
const router = express.Router();
const Messages = require('../../controllers/messages');
const { getAdminThreads, getUserThreads } = require('../../services/messages');

// get messages endpoint api/messages
router.get('/', async (req, res) => {
  let type = req.query.type || '';
  let userId = req.query.id || '';
  let archived = req.query.archived === 'true';

  // TODO this is ugly but will be fixed soon...
  const messages =
    userId === 'all'
      ? await getAdminThreads(type, archived)
      : await getUserThreads(userId, archived);

  res.json(messages);
});

// create message endpoint post to api/messages
router.post('/', Messages.createMessage);

// update message endpoint put to api/messages/:id
router.put('/:id', Messages.markMessageAsViewed);

module.exports = router;
