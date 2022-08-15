const express = require('express');
const router = express.Router();
const Tags = require('../../controllers/tags');
const { getTags, updateItemWithTags, updateUserWithTags, deleteTag, deleteTagFromItem, deleteTagFromUser } = require('../../services/tags');

// get tags endpoint api/tags
router.get('/', async (req, res) => {
    const tags = await getTags();
    res.json(tags);
});

// create tag endpoint post to api/tags
router.post('/', Tags.createTag);

//update itrem with tags
router.put('/item', async (req, res) => {
    let tagId = req.body.tagId || '';
    let itemId = req.body.itemId || '';
    const result = await updateItemWithTags(tagId, itemId);
    res.json(result);
});

//remove tag from item
router.delete('/item', async (req, res) => {
    let tagId = req.body.tagId || '';
    let itemId = req.body.itemId || '';
    const result = await deleteTagFromItem(tagId, itemId);
    res.json(result);
});

//update user with tags
router.put('/user', async (req, res) => {
    let tagId = req.body.tagId || '';
    let userId = req.body.userId || '';
    const result = await updateUserWithTags(tagId, userId);
    res.json(result);
});

//remove tag from item
router.delete('/user', async (req, res) => {
    let tagId = req.body.tagId || '';
    let userId = req.body.userId || '';
    const result = await deleteTagFromUser(tagId, userId);
    res.json(result);
});

// update item endpoint put to api/settings/:name
router.put('/:id', Tags.updateTag);

// delete tag endoint delete to api/tags/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const tag = await deleteTag(id);
    res.json(tag);
});

module.exports = router;