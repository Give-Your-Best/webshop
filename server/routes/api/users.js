const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const { getAllUsers, getUser, deleteUser, getDonations } = require('../../services/users');

// get users endpoint api/users
router.get('/', async (req, res) => {
    let type = req.query.type || 'all';
    let approvedStatus = req.query.approvedStatus || '';
    const users = await getAllUsers(type, approvedStatus);
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

// update user endpoint put to api/users/:id
router.put('/:id', Users.updateUser);

// update user endpoint put to api/users/:id
router.put('/donor/:id', Users.updateDonor);

// create user endpoint post to api/users
router.post('/', Users.createUser);

// delete user endoint delete to api/users/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await deleteUser(id);
    res.json(user);
});

module.exports = router;