const express = require('express');
const router = express.Router();
const Tags = require('../../controllers/tags');
const { getTags, updateItemWithTags } = require('../../services/tags');

// get tags endpoint api/tags
router.get('/', async (req, res) => {
    const tags = await getTags();
    res.json(tags);
});

// create tag endpoint post to api/tags
router.post('/', Tags.createTag);

//update itrem with tags
router.put('/item:/itemId', async (req, res) => {
    let tags = req.body;
    let itemId = req.params.itemId;
    const result = await updateItemWithTags(tags, itemId);
    res.json(result);
});

module.exports = router;