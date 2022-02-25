const Item = require('../models/Item');

const createItem = async (data) => {
    console.log('create item service');
    console.log(data);
    try {
        const item = new Item(data)
        item.save(err=>{
            if (err) {
              throw Error(err);
            } else {
              return { success: true, message: 'Item created' }
            }
        })
    } catch (err) {
        console.error(err);
        return { success: false, message: err }
    }
};

const updateItem = async (id, updateData) => {
    console.log('update item service');
    try {
        const item = await Item.findByIdAndUpdate(id, updateData, { useFindAndModify: false });
        if (item) {
            return { success: true, message: 'Item updated' }
        } else {
          throw Error('Cannot update item');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};

const deleteItem = async (id) => {
    console.log('delete item service');
    try {
        const item = await Item.findByIdAndRemove(id, { useFindAndModify: false });
        if (item) {
            return { success: true, message: 'Item deleted' }
        } else {
          throw Error('Cannot delete item');
        }
    } catch (error) {
        console.error(`Error in deleteItem: ${error}`);
        return { success: false, message: `Error in deleteItem: ${error}` }
    }
};

const getAllItems = async () => {
    try {
      const items = await Item.find({}).lean();
      return items;
    } catch (error) {
      console.error(`Error in getAllItems: ${error}`);
      return { success: false, message: `Error in getAllItems: ${error}` }
    }
};

const getItem = async (id) => {
    console.log('get item')
    try {
        const item = await Item.findById(id);
        if (item) {
            return item
        } else {
          throw Error('Cannot find item');
        }
      } catch (error) {
        console.error(`Error in getItem: ${error}`);
        return { success: false, message: `Error in getItem: ${error}` }
      }
};

module.exports = { 
    createItem,
    getItem,
    getAllItems,
    deleteItem,
    updateItem
};