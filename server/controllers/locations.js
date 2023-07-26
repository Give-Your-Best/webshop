require('dotenv').config();
const uuidv4 = require('uuid').v4;
const Location = require('../models/Location');
const LocationsService = require('../services/locations');

const updateLocation = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: location details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await LocationsService.updateLocation(id, data);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      location: response.location,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const createLocation = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ message: 'Service error: new location details are required' });
  }

  try {
    const response = await LocationsService.createLocation(req.body);
    return res.status(200).send({
      success: true,
      message: `Location created`,
      location: response.location || {},
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

module.exports = {
  updateLocation,
  createLocation,
};
