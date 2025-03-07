const Item = require('../models/Item');
const User_ = require('../models/User');
const { sendMail } = require('../services/mail');

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
      new: true,
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
      new: true,
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
      new: true,
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
      new: true,
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

// Used for auto-trusting donors upon receiving 5 items
// via the 'Mark received' by an admin in 'Account Notifications'
const evaluateDonorTrust = async (itemId) => {
  try {
    // Fetch the item
    const item = await Item.findById(itemId);
    if (!item) throw new Error('Item not found');

    // Fetch the donor associated with the item
    const donor = await User_.User.findById(item.donorId);
    if (!donor) throw new Error('Donor not found');

    // If the donor is already trusted, no further action is needed
    if (donor.trustedDonor) {
      return { updated: false };
    }

    // Define the statuses that verify the donor's trust
    const receivedStatuses = [
      'received-by-gyb',
      'shipped-to-shopper',
      'received',
    ];

    // Count how many of the donor's items have been received by GYB or are in the verified statuses
    const receivedByGYBCount = await Item.countDocuments({
      donorId: donor._id,
      status: { $in: receivedStatuses },
    });

    // If the donor has at least 5 items with the verified statuses, mark the donor as trusted
    // This takes into account the current item being processed as the 5th item, fulfilling the trust criteria
    if (receivedByGYBCount >= 5) {
      donor.trustedDonor = true;
      await donor.save();

      // Construct the email content
      const homeLink = 'https://shop.giveyourbest.uk/dashboard';
      const emailSubject = 'Your Account Has Been Approved';
      const emailHTML = `<p>Dear ${donor.firstName},</p><p>Great news, your 5 items have been shopped successfully so your account has been approved! You are now able to continue uploading items.</p><p>Thank you for your donations and support.</p><a href='${homeLink}'>Log In</a>`;

      // Send the email
      await sendMail(emailSubject, emailHTML, donor.email, donor.firstName);

      return { updated: true }; // Donor was updated to trusted
    }

    return { updated: false }; // Not enough items in verified statuses, no update
  } catch (error) {
    console.error('Error in evaluateDonorTrust service:', error);
    throw error;
  }
};

// March IWM promo donors updates...
const updatePromoDonors = async (ids) => {
  const result = await User_.Donor.updateMany(
    { _id: { $in: ids } },
    { $set: { hasReceivedMarchIwnPromoEmail: true } }
  );

  return result;
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
  evaluateDonorTrust,
  updatePromoDonors,
};
