const Tag = require('../models/Tag');
const Item = require('../models/Item');

const getTags = async () => {
  console.log('get')
  try {
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    console.error(`Error in get tags: ${error}`);
    return { success: false, message: `Error in get tags: ${error}` }
  }
};


const createTag = async (data) => {
  console.log('create')
  console.log(data)
  try {
      const tag = new Tag(data)
      let saveTag = await tag.save();
      return { success: true, message: `tag created` }
  } catch (err) {
      console.error(err);
      return { success: false, message: err }
  }
};

const updateItemWithTags = async (tags, itemId) => {
  //tags should be a list of ids liek ['012345678', '1234566778']
  if (!tags.length || !itemId) {
    console.log('none')
    return 
  }
  try {
    console.log(tags)
      Item.update({ _id: itemId }, { $addToSet : { tags: tags }})
      return { success: true, message: `tag added to item` }
  } catch (err) {
      console.error(err);
      return { success: false, message: err }
  }
};


module.exports = { 
  getTags,
  createTag,
  updateItemWithTags
};