const express = require('express');
const router = express.Router();
const Items = require('../../controllers/items');

// create batch item endpoint post to api/batchitems
router.post('/', Items.createBatchItem);

// delete batchItem endoint api/batchItems/:id
router.delete('/:id', async (req, res) => {
  await Items.deleteBatchItem(req, res);
});

module.exports = router;
