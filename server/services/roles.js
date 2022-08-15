const Role = require('../models/Role');

const getAllRoles = async () => {
  try {
    const roles = await Role.find();
    return roles;
  } catch (error) {
    console.error(`Error in getAllRoles: ${error}`);
    return { success: false, message: `Error in getAllRoles: ${error}` }
  }
};

const getRole = async (name) => {
    console.log('get role')
    try {
        const role = await Role.find({'name': name});
        if (role) {
            return role
        } else {
          throw Error('Cannot find role');
        }
      } catch (error) {
        console.error(`Error in getrole: ${error}`);
        return { success: false, message: `Error in get role: ${error}` }
      }
};

module.exports = { 
  getRole,
  getAllRoles
};