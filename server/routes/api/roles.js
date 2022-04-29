const express = require('express');
const router = express.Router();
const { getAllRoles, getRole } = require('../../services/roles');

// get roles endpoint api/roles
router.get('/', async (req, res) => {
    const roles = await getAllRoles();
    res.json(roles);
});

// get item endoint api/settings/:name
router.get('/:name', async (req, res) => {
    const name = req.params.name;
    const role = await getRole(name);
    res.json(role);
});

module.exports = router;