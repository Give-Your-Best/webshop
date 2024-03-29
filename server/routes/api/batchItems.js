const express = require('express');
const router = express.Router();
const Items = require('../../controllers/items');

// create batch item endpoint post to api/batchitems
router.post('/', Items.createBatchItem);

// update item endpoint put to api/items/:id
// router.put('/:id', Items.updateBatchItem);

// delete batchItem endoint api/batchItems/:id
router.delete('/:id', async (req, res) => {
  await Items.deleteBatchItem(req, res);
});

// get batch item endoint api/batchItems/:id
router.get('/:id', async (req, res) => {
  await Items.getBatchItem(req, res);
});

// update batch item endpoint put to api/batchItems/:id
router.put('/:id', Items.updateBatchItem);

module.exports = router;
