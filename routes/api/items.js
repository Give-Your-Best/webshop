const express = require('express');
const router = express.Router();
const { items } = require('../mockData/items');

// api/items
router.get('/', (req, res) => {
  res.json(items);
});

// api/items/:id
router.get('/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const foundItem = items.find((item) => item.id === id);
  if (foundItem) {
    res.status(200).json(foundItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
