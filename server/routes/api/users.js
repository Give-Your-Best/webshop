const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const { getAllUsers, getUser, deleteUser } = require('../../services/users');

// get users endpoint api/users
router.get('/', async (req, res) => {
    let type = req.query.type || 'all';
    const users = await getAllUsers(type);
    res.json(users);
});
  
// get user endoint api/users/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.json(user);
});

// update user endpoint put to api/users/:id
router.put('/:id', Users.updateUser);

// create user endpoint post to api/users
router.post('/', Users.createUser);

// delete user endoint delete to api/users/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await deleteUser(id);
    res.json(user);
});

module.exports = router;