const Item = require('../models/Item');
const User_ = require('../models/User');

const createUser = async (data) => {
  try {
    var user = await User_.User.findOne({
      email: data.email,
    });
    if (user) {
      throw Error('Email already in use');
    } else {
      if (data.type == 'donor') {
        user = new User_.Donor(data);
      } else if (data.type == 'shopper') {
        user = new User_.Shopper(data);
      } else if (data.type == 'admin') {
        user = new User_.Admin(data);
      }
      await user.save();
      return { success: true, message: `User created`, user: user };
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const updateUser = async (id, updateData) => {
  try {
    const user = await User_.User.findOneAndUpdate({ _id: id }, updateData, {
      returnDocument: 'after',
    });
    if (user) {
      return { success: true, message: `User updated`, user: user };
    } else {
      throw Error('Cannot update user');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

const updateDonor = async (id, updateData) => {
  if (updateData.trustedDonor === true) {
    await Item.updateMany(
      { donorId: id.toString(), approvedStatus: 'in-progress' },
      { $set: { approvedStatus: 'approved' } }
    );
  }
  try {
    const user = await User_.Donor.findOneAndUpdate({ _id: id }, updateData, {
      returnDocument: 'after',
    });
    if (user) {
      return { success: true, message: `User updated`, user: user };
    } else {
      throw Error('Cannot update user');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

const updateShopper = async (id, updateData) => {
  try {
    const user = await User_.Shopper.findOneAndUpdate({ _id: id }, updateData, {
      returnDocument: 'after',
    });
    if (user) {
      return { success: true, message: `User updated`, user: user };
    } else {
      throw Error('Cannot update user');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

const updateAdmin = async (id, updateData) => {
  try {
    const user = await User_.Admin.findOneAndUpdate({ _id: id }, updateData, {
      returnDocument: 'after',
    });
    if (user) {
      return { success: true, message: `User updated`, user: user };
    } else {
      throw Error('Cannot update user');
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User_.User.findByIdAndDelete(id);
    if (user) {
      return { success: true, message: 'User deleted' };
    } else {
      throw Error('Cannot delete user');
    }
  } catch (error) {
    console.error(`Error in deleteUser: ${error}`);
    return { success: false, message: `Error in deleteUser: ${error}` };
  }
};

const getAllUsers = async (type, approvedStatus) => {
  try {
    let users;

    if (type == 'donor') {
      users = await User_.Donor.find({
        approvedStatus: approvedStatus,
      }).populate('tags');
    } else if (type == 'shopper') {
      users = await User_.Shopper.find({
        approvedStatus: approvedStatus,
      }).populate('tags');
    } else if (type == 'admin') {
      users = await User_.Admin.find({
        approvedStatus: approvedStatus,
      }).lean();
    }
    return users;
  } catch (error) {
    console.error(`Error in getAllUsers: ${error}`);
    return { success: false, message: `Error in getAllUsers: ${error}` };
  }
};

// Count all users - we should add conditions handling here...
const countAllUsers = () => User_.User.countDocuments();

// Minimal list handler with pagination
const listAllUsersPaginated = async (limit, offset) => {
  try {
    const users = await User_.User.find({})
      .limit(limit)
      .skip(offset)
      .select('firstName lastName email kind')
      .lean();

    return users;
  } catch (error) {
    console.error(`Error in listAllUsers: ${error}`);
    return { success: false, message: `Error in listAllUsers: ${error}` };
  }
};

// Minimal list handler parallelised - pattern is useful and can be extracted to
// a util or something for reuse...
const listAllUsers = async () => {
  const condition = { approvedStatus: 'approved' };

  try {
    const count = await User_.User.countDocuments(condition);

    const div = 4;
    const rem = count % div;
    const max = (count - rem) / div;

    const init = new Array(div).fill(max).concat([rem]).filter(Boolean);

    const data = await Promise.all(
      init.map(async (limit, index) =>
        User_.User.find(condition)
          .limit(limit)
          .skip(index * limit)
          .select('firstName lastName email kind')
          .lean()
      )
    );

    const users = [].concat(...data);

    return users;
  } catch (error) {
    console.error(`Error in listAllUsers: ${error}`);
    return { success: false, message: `Error in listAllUsers: ${error}` };
  }
};

const getDonations = async (approvedStatus) => {
  try {
    // We care about approved but not yet trusted users
    const donors = await User_.Donor.find({
      $and: [{ trustedDonor: { $ne: true } }, { approvedStatus: 'approved' }],
    }).select('id firstName lastName');

    const condition = {
      donorId: { $in: donors },
      approvedStatus: approvedStatus,
    };

    // Pull the relevant items
    const data = await Item.find(condition).lean();

    // Group items under donor id
    const donorItems = data.reduce((acc, cur) => {
      acc[cur.donorId] = acc[cur.donorId] || [];
      acc[cur.donorId].push(cur);
      return acc;
    }, {});

    // Format the result
    const result = donors.map((d) => {
      const name = `${d.firstName} ${d.lastName}`.trim();
      const donationItems = donorItems[d.id] || [];
      const numOfDonationItems = donationItems.length;

      return {
        _id: d.id,
        name,
        donationItems,
        numOfDonationItems,
      };
    });

    return result;
  } catch (error) {
    console.error(`Error in get donations: ${error}`);
    return { success: false, message: `Error in getdonations: ${error}` };
  }
};

const getUser = async (id) => {
  try {
    const user = await User_.User.findById(id).populate('tags');
    if (user && user.approvedStatus == 'approved') {
      return user;
    } else {
      throw Error('Cannot find user');
    }
  } catch (error) {
    console.error(`Error in getUser: ${error}`);
    return { success: false, message: `Error in getUser: ${error}` };
  }
};

const getUsers = async (ids) => {
  try {
    const users = await User_.User.find({
      _id: { $in: ids },
    }).select('id kind email firstName lastName');

    return users;
  } catch (error) {
    console.error(`Error in getUsers: ${error}`);
    return { success: false, message: `Error in getUsers: ${error}` };
  }
};

const getGYBDummyUser = async (name) => {
  try {
    const user = await User_.User.find({ firstName: name });
    return user[0]._id;
  } catch (error) {
    console.error(`Error in getting User for message: ${error}`);
    return {
      success: false,
      message: `Error in getting User for message: ${error}`,
    };
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  getAllUsers,
  countAllUsers,
  listAllUsers,
  listAllUsersPaginated,
  deleteUser,
  updateUser,
  updateDonor,
  updateShopper,
  updateAdmin,
  getGYBDummyUser,
  getDonations,
};
