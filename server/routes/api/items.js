const express = require('express');
const router = express.Router();
const Items = require('../../controllers/items');
const { getAllItems, 
    getItem, 
    deleteItem, 
    getAccountNotificationItems, 
    getShopNotificationItems,
    getDonorItems,
    getAdminItems,
    getShopperItems
} = require('../../services/items');

// get items endpoint api/items
router.get('/', async (req, res) => {
    let approvedStatus = req.query.approvedStatus || '';
    let itemStatus = req.query.itemStatus || '';
    let category = req.query.category || null;
    let subCategory = req.query.subCategory || null;
    let donorId = req.query.donorId || null;
    const items = await getAllItems(approvedStatus, itemStatus, category, subCategory, donorId);
    res.json(items);
});

// get donor items endpoint api/items
router.get('/donor', async (req, res) => {
    let userId = req.query.userId || '';
    let itemStatus = req.query.itemStatus || '';
    const items = await getDonorItems(userId, itemStatus);
    res.json(items);
});

// get admin items endpoint api/items
router.get('/admin', async (req, res) => {
    let isCurrent = req.query.isCurrent || false;
    const items = await getAdminItems(isCurrent);
    res.json(items);
});

// get items endpoint api/items
router.get('/shopper', async (req, res) => {
    let userId = req.query.userId || '';
    let itemStatus = req.query.itemStatus || '';
    const items = await getShopperItems(userId, itemStatus);
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
    const items = await getShopNotificationItems()
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