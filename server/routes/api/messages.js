const express = require('express');
const router = express.Router();
const Messages = require('../../controllers/messages');
const {
  deleteThread,
  getAdminThreads,
  getUserThreads,
  toggleArchived,
} = require('../../services/messages');

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

// archive the message thread
router.put('/archive/:id', async (req, res) => {
  let threadId = req.params.id || '';
  const message = await toggleArchived(threadId, true);
  res.json(message);
});

// unarchive the message thread
router.put('/restore/:id', async (req, res) => {
  let threadId = req.params.id || '';
  const message = await toggleArchived(threadId, false);
  res.json(message);
});

// delete the message thread
router.delete('/:id', async (req, res) => {
  let threadId = req.params.id || '';
  const message = await deleteThread(threadId);
  res.json(message);
});

module.exports = router;
