const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const options = { discriminatorKey: 'kind', timestamps: true };

// define the shared mongoose user model
const userSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  approvedStatus: {
    type: String,
    enum: ['in-progress', 'approved', 'rejected'],
    default : 'in-progress'
  },
  infoRequested: Boolean
}, options);

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async (
  candidatePassword,
  knownPassword
) => {
  const isMatch = await bcrypt.compare(candidatePassword, knownPassword);
  return isMatch;
};

// create the model class
const User = mongoose.model('User', userSchema);

// User type donor
const Donor = User.discriminator("donor", new Schema({
  trustedDonor: Boolean
}, options));

//clothing sizes ["6 or EU34", "8 or EU36", "10 or EU38", "12 or EU40", "14 or EU42", "16 or EU44", "18 or EU46", "20 or EU48", "22 or EU50", "24 or EU52", "26 or EU54", "26 or EU56", "Other"]
//shoe sizes ["3 or EU36", "4 or EU37", "5 or EU38", "6 or EU39", "7 or EU40", "8 or EU41", "9 or EU42", "10 or EU43", "Other"]
//current status ["Seeking Asylum", "Refugee", "Destitute","No recourse to public funds", "Prefer not to say", "Other"]
//shopping for Number of people ( default to 1 )

//User type shopper
const Shopper = User.discriminator("shopper", new Schema({
  clothingSize: {
    UK: String,
    EU: String,
  },
  shoeSize: {
    UK: String,
    EU: String,
  },
  deliveryPreference: {
    type: String,
    enum: ["direct", "via gyb", "to local"],
    default : 'direct'
  },
  currentStatus: String,
  referredBy: String,
  shoppingFor: {
    type: Number,
    default : 1
  }, 
  deliveryAddress: {
    firstLine: String,
    secondLine: String,
    postcode: String,
    city: String
  }
}, options));

// User type admin

const Admin = User.discriminator("admin", new Schema({
  role: String,
  assignedRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  addresses: [{
    firstLine: String,
    secondLine: String,
    postcode: String,
    city: String,
    available: Boolean,
    assignedCount: Number
  }]
}, options));

// export the model
module.exports = {
  User: User,
  Shopper: Shopper,
  Donor: Donor,
  Admin: Admin
};
