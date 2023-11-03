const Tag = require('../models/Tag');
const Item = require('../models/Item');
const User_ = require('../models/User');

const getTags = async () => {
  try {
    // TODO this is an incredibly slow query and from what I can see we can
    // probablt abandon the populate lookups entirely...
    const tags = await Tag.find({}).populate('items').populate('users');
    return tags;
  } catch (error) {
    console.error(`Error in get tags: ${error}`);
    return { success: false, message: `Error in get tags: ${error}` };
  }
};

const deleteTag = async (id) => {
  try {
    const tag = await Tag.findByIdAndRemove(id, { useFindAndModify: false });
    if (tag) {
      return { success: true, message: 'tag deleted' };
    } else {
      throw Error('Cannot delete tag');
    }
  } catch (error) {
    console.error(`Error in delete tag: ${error}`);
    return { success: false, message: `Error in delete tag: ${error}` };
  }
};

const updateTag = async (id, updateData) => {
  try {
    const tag = await Tag.findOneAndUpdate({ _id: id }, updateData, {
      useFindAndModify: false,
      returnDocument: 'after',
    });
    if (tag) {
      return { success: true, message: 'setting updated', tag: tag };
    } else {
      throw Error('Cannot update tag');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

const createTag = async (data) => {
  try {
    const tag = new Tag(data);
    let saveTag = await tag.save();
    return { success: true, message: `tag created`, tag: tag };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

const updateItemWithTags = async (tag, itemId) => {
  if (!tag || !itemId) {
    console.log('none');
    return { success: false, message: 'No tags to add' };
  }
  try {
    await Item.findOneAndUpdate(
      { _id: itemId, tags: { $ne: tag } },
      { $push: { tags: tag } }
    );
    return { success: true, message: `tag added to item` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

const deleteTagFromItem = async (tag, itemId) => {
  if (!tag || !itemId) {
    console.log('none');
    return { success: false, message: 'No tags to delete' };
  }
  try {
    await Item.findOneAndUpdate({ _id: itemId }, { $pull: { tags: tag } });
    return { success: true, message: `tag removed from item` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

const updateUserWithTags = async (tag, userId) => {
  if (!tag || !userId) {
    console.log('none');
    return { success: false, message: 'No tags to add' };
  }
  try {
    await User_.User.findOneAndUpdate(
      { _id: userId, tags: { $ne: tag } },
      { $push: { tags: tag } }
    );
    return { success: true, message: `tag added to user` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

const deleteTagFromUser = async (tag, userId) => {
  if (!tag || !userId) {
    console.log('none');
    return { success: false, message: 'No tags to delete' };
  }
  try {
    await User_.User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tags: tag } }
    );
    return { success: true, message: `tag removed from user` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  updateItemWithTags,
  deleteTagFromItem,
  updateUserWithTags,
  deleteTagFromUser,
};
