const express = require('express');
const router = express.Router();
const Items = require('../../controllers/items');
const { getAllItems, getItem, deleteItem, getAccountNotificationItems, getShopNotificationItems } = require('../../services/items');

// get items endpoint api/items
router.get('/', async (req, res) => {
    let type = req.query.type || 'all';
    let approvedStatus = req.query.approvedStatus || '';
    let userId = req.query.userId || '';
    let itemStatus = req.query.itemStatus || '';
    const items = await getAllItems(approvedStatus, type, userId, itemStatus);
    res.json(items);
});

// get account notification items endpoint api/items
router.get('/accountNotification', async (req, res) => {
    let adminUserId = req.query.adminUserId || '';
    const items = await getAccountNotificationItems(adminUserId);
    res.json(items);
});

// get shop notifications items endpoint api/items
router.get('/shopNotification', async (req, res) => {
    const items = await getShopNotificationItems();
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

// get items endpoint api/items
router.post('/dummy', async (req, res) => {
    res.json({"success": true});
});

// delete item endoint delete to api/items/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await deleteItem(id);
    res.json(item);
});

module.exports = router;