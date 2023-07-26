require('dotenv').config();
const uuidv4 = require('uuid').v4;
const UserService = require('../services/users');

const createUser = async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .send({ message: 'Service error: new user details are required' });
  }

  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).send({
      success: true,
      message: `User created`,
      user: response.user || {},
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const registerUser = async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .send({ message: 'Service error: new user details are required' });
  }
  if (!req.body.type || !['shopper', 'donor'].includes(req.body.type)) {
    return res.status(400).send({ message: 'User must have a valid type' });
  }

  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).send({
      success: true,
      message: `User registered`,
      user: response.user || {},
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: User details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await UserService.updateUser(id, data);
    return res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateDonor = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: User details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await UserService.updateDonor(id, data);
    return res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateShopper = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: User details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await UserService.updateShopper(id, data);
    return res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateAdmin = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: User details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await UserService.updateAdmin(id, data);
    return res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

module.exports = {
  createUser,
  updateUser,
  updateDonor,
  updateShopper,
  updateAdmin,
  registerUser,
};
