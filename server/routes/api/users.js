const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const {
  getAllUsers,
  getUser,
  deleteUser,
  getDonations,
  getGYBDummyUser,
  countAllUsers,
  listAllUsers,
  listAllUsersPaginated,
} = require('../../services/users');

// get users endpoint api/users
router.get('/', async (req, res) => {
  let type = req.query.type || 'all';
  let approvedStatus = req.query.approvedStatus || '';
  const users = await getAllUsers(type, approvedStatus);
  res.json(users);
});

// count all the users - we should add conditions...
router.get('/count', async (req, res) => {
  const total = await countAllUsers();
  res.json({ total });
});

// list all users with no condition on type etc - allows pagination
router.get('/list', async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  let users;

  if (limit && offset) {
    users = await listAllUsersPaginated(Number(limit), Number(offset));
  } else {
    users = await listAllUsers();
  }

  res.json(users);
});

// get all donated items by donor api/users/donations
router.get('/donations', async (req, res) => {
  let approvedStatus = req.query.approvedStatus || 'all';
  const donations = await getDonations(approvedStatus);
  res.json(donations);
});

// get user endoint api/users/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.json(user);
});

// get user endoint api/users/:id
router.get('/dummyadmin/:name', async (req, res) => {
  const name = req.params.name;
  const user = await getGYBDummyUser(name);
  res.json(user);
});

// update user endpoint put to api/users/:id
router.put('/:id', Users.updateUser);

// update user endpoint put to api/users/:id
router.put('/donor/:id', Users.updateDonor);

// update user endpoint put to api/users/:id
router.put('/shopper/:id', Users.updateShopper);

// update user endpoint put to api/users/:id
router.put('/admin/:id', Users.updateAdmin);

// create user endpoint post to api/users
router.post('/', Users.createUser);

// delete user endoint delete to api/users/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);
  res.json(user);
});

module.exports = router;
