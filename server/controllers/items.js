require('dotenv').config();
const uuidv4 = require('uuid').v4;
const Item = require('../models/Item');
const ItemService = require('../services/items');

const createItem = async (req, res) => {
    console.log('create Item controller')
    console.log(req.body);
    if (!req.body.name) {
      return res.status(400).send({message: "Service error: new item details are required"});
    }
    const itemData = {
        name : req.body.name,
        status : req.body.status,
        description : req.body.description,
        category : req.body.category || 'Miscellaneous',
        size : req.body.size
    }
    try {
      const response = await ItemService.createItem(itemData);
      return res.status(200).send({
        success: response.success,
        message: response.message
      });
    } catch (err) {
      console.error(`Service error: ${err}`);
      return res.status(500).send({message: `Service error: ${err}`});
    }
};

const updateItem = async (req, res) => {
  console.log('update Item controller');
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({message: "Service error: Item details are required"});
  }
  const id = req.params.id,
        data = req.body;
  try {
    const response = await ItemService.updateItem(id, data);
    return res.status(200).send({
      success: response.success,
      message: response.message
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }

};

module.exports = {
  createItem,
  updateItem
};