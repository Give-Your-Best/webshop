const express = require('express');
const router = express.Router();
const Items = require('../../controllers/items');
const { getAllItems, getItem, deleteItem } = require('../../services/items');

// get items endpoint api/items
router.get('/', async (req, res) => {
    const items = await getAllItems();
    res.json(items);
});
  
// get item endoint api/items/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await getItem(id);
    res.json(item);
});

// update item endpoint put to api/items/:id
router.put('/:id', Items.updateItem);

// create item endpoint post to api/items
router.post('/', Items.createItem);

// delete item endoint delete to api/items/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await deleteItem(id);
    res.json(item);
});

module.exports = router;