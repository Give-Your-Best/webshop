require('dotenv').config();
const uuidv4 = require('uuid').v4;
const UserService = require('../services/users');

const createUser = async (req, res) => {
    console.log('create user controller')
    console.log(req.body);
    if (!req.body.username) {
      return res.status(400).send({message: "Service error: new user details are required"});
    }

    try {
      const response = await UserService.createUser(req.body);
      return res.status(200).send({
        success: true,
        message: `User created`,
      });
    } catch (err) {
      console.error(`Service error: ${err}`);
      return res.status(500).send({message: `Service error: ${err}`});
    }
};

const registerUser = async (req, res) => {
  console.log('register user controller')
  console.log(req.body);
  if (!req.body.username) {
    return res.status(400).send({message: "Service error: new user details are required"});
  }
  if (!req.body.type || !['shopper', 'donor'].includes(req.body.type)) {
    return res.status(400).send({message: "User must have a valid type"});
  }

  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).send({
      success: true,
      message: `User registered`,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }
};

const updateUser = async (req, res) => {
  console.log('update user controller');
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({message: "Service error: User details are required"});
  }
  const id = req.params.id,
        data = req.body;
  try {
    const response = await UserService.updateUser(id, data);
    return res.status(200).send({
      success: true,
      message: `User updated`,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }

};

module.exports = {
  createUser,
  updateUser,
  registerUser
};