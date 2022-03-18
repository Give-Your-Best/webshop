const Role = require('../models/Role');
const User_ = require('../models/User');

const createUser = async (data) => {
    console.log('create user service');
    console.log(data)
    try {
        var user = await User_.User.findOne({
          email: data.email,
        });
        if (user) {
            throw Error('Email is already in use');
        } else {
          if (data.type == 'donor') {
            user = new User_.Donor(data);
          } else if (data.type == "shopper") {
            user = new User_.Shopper(data);
          } else if (data.type == "admin") {
            user = new User_.Admin(data);
          }
          user.save(err=>{
              if (err) {
                throw Error(err);
              } else {
                return { success: true, message: 'User created' }
              }
          })
        }
    } catch (err) {
        console.error(err);
        return { success: false, message: err }
    }
};

const updateUser = async (id, updateData) => {
    console.log('update user service');
    try {
        const user = await User_.User.findByIdAndUpdate(id, updateData, { useFindAndModify: false });
        if (user) {
            return { success: true, message: 'User updated' }
        } else {
          throw Error('Cannot update user');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};

const deleteUser = async (id) => {
    console.log('delete user service');
    try {
        const user = await User_.User.findByIdAndRemove(id, { useFindAndModify: false });
        if (user) {
            return { success: true, message: 'User deleted' }
        } else {
          throw Error('Cannot delete user');
        }
    } catch (error) {
        console.error(`Error in deleteUser: ${error}`);
        return { success: false, message: `Error in deleteUser: ${error}` }
    }
};

const getAllUsers = async (type) => {
    try {
      if (type == 'donor') {
        var users = await User_.Donor.find({approvedStatus: 'approved'}).lean();
      } else if (type == "shopper") {
        var users = await User_.Shopper.find({approvedStatus: 'approved'}).lean();
      } else if (type == "admin") {
        var users = await User_.Admin.find({approvedStatus: 'approved'}).lean();
      }
      return users;
    } catch (error) {
      console.error(`Error in getAllUsers: ${error}`);
      return { success: false, message: `Error in getAllUsers: ${error}` }
    }
};

const getUser = async (id) => {
    console.log('getuser')
    try {
        const user = await User_.findById(id).populate('assignedRole');
        if (user || approvedStatus != 'approved') {
            return user
        } else {
          throw Error('Cannot find user');
        }
      } catch (error) {
        console.error(`Error in getUsers: ${error}`);
        return { success: false, message: `Error in getUsers: ${error}` }
      }
};

module.exports = { 
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser
};