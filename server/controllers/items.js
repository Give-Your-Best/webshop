require('dotenv').config();
const uuidv4 = require('uuid').v4;
const Item = require('../models/Item');
const ItemService = require('../services/items');

const createItem = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ message: 'Service error: new item details are required' });
  }
  try {
    const response = await ItemService.createItem(req.body);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      item: response.item || {},
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const createBatchItem = async (req, res) => {
  if (!req.body.itemsData) {
    return res
      .status(400)
      .send({ message: 'Service error: batch item details are required' });
  }
  try {
    const response = await ItemService.createBatchItem(req.body);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      batchItem: response.batchItem || {},
      items: response.items || [],
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const deleteBatchItem = async (req, res) => {
  try {
    const response = await ItemService.deleteBatchItem(req.params.id);
    if (response.success) {
      return res.status(200).send({
        success: true,
        message: 'BatchItem and associated items deleted',
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'BatchItem not found',
      });
    }
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateItem = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: Item details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await ItemService.updateItem(id, data);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      item: response.item,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

module.exports = {
  createItem,
  createBatchItem,
  updateItem,
  deleteBatchItem,
};
