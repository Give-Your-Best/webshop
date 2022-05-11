const Role = require('../models/Role');
const Item = require('../models/Item');
const User_ = require('../models/User');

const createUser = async (data) => {
    console.log('create user serviceee');
    console.log(data)
    try {
        var user = await User_.User.findOne({
          email: data.email,
        });
        if (user) {
          throw Error('Email already in use');
        } else {
          if (data.type == 'donor') {
            user = new User_.Donor(data);
          } else if (data.type == "shopper") {
            user = new User_.Shopper(data);
          } else if (data.type == "admin") {
            user = new User_.Admin(data);
          }
          let saveUser = await user.save();
          return { success: true, message: `User created`, user: user }
        }
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

const updateUser = async (id, updateData) => {
    console.log('update user service');
    try {
        const user = await User_.User.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
        if (user) {
            return { success: true, message: `User updated`, user: user }
        } else {
          throw Error('Cannot update user');
        }
    } catch (err) {
        console.log(err);
        return { success: false, message: err }
    }
};

const updateDonor = async (id, updateData) => {
  console.log('update donor service');
  try {
      const user = await User_.Donor.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
      if (user) {
          return { success: true, message: `User updated`, user: user }
      } else {
        throw Error('Cannot update user');
      }
  } catch (err) {
      console.log(err);
      return { success: false, message: err }
  }
};

const updateShopper = async (id, updateData) => {
  console.log('update shopper service');
  try {
      const user = await User_.Shopper.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
      if (user) {
          return { success: true, message: `User updated`, user: user }
      } else {
        throw Error('Cannot update user');
      }
  } catch (err) {
      console.log(err);
      return { success: false, message: err }
  }
};

const updateAdmin = async (id, updateData) => {
  console.log('update admin service');
  try {
      const user = await User_.Admin.findOneAndUpdate({"_id": id}, updateData, { useFindAndModify: false, returnDocument: 'after' });
      if (user) {
          return { success: true, message: `User updated`, user: user }
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

const getAllUsers = async (type, approvedStatus) => {
    try {
      if (type == 'donor') {
        var users = await User_.Donor.find({approvedStatus: approvedStatus}).lean();
      } else if (type == "shopper") {
        var users = await User_.Shopper.find({approvedStatus: approvedStatus}).lean();
      } else if (type == "admin") {
        var users = await User_.Admin.find({approvedStatus: approvedStatus}).lean();
      }
      return users;
    } catch (error) {
      console.error(`Error in getAllUsers: ${error}`);
      return { success: false, message: `Error in getAllUsers: ${error}` }
    }
};

const getDonations = async (approvedStatus) => {
  console.log('get donations');
  try {
    const donations = await User_.Donor.aggregate([
      {
        $match: {
          $and: [
            {trustedDonor: false},
            {approvedStatus: 'approved'}
          ]
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'donorId',
           pipeline: [
              { $match:
                 { $expr:
                    { $and:
                       [
                         { $eq: [ "$approvedStatus",  approvedStatus ] }
                       ]
                    }
                 }
              },
           ],
          as: 'donationItemsDetails',
        },
      },
      {
        $project:{
          _id:"$_id",
          name: {$concat: [ "$firstName", " ", "$lastName" ]},
          hod:"$hod",
          numOfDonationItems:{$size:"$donationItemsDetails"},
          donationItems:"$donationItemsDetails"
        }
      }
    ]).exec();
    return donations;
  } catch (error) {
    console.error(`Error in get donations: ${error}`);
    return { success: false, message: `Error in getdonations: ${error}` }
  }
}

const getUser = async (id) => {
    console.log('getuser')
    try {
        const user = await User_.User.findById(id);
        if (user || approvedStatus != 'approved') {
            return user
        } else {
          throw Error('Cannot find user');
        }
      } catch (error) {
        console.error(`Error in getUser: ${error}`);
        return { success: false, message: `Error in getUser: ${error}` }
      }
};

module.exports = { 
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    updateDonor,
    updateShopper,
    updateAdmin,
    getDonations
};