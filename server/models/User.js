const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// define the mongoose user model
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});

// On save hook, encrypt password
userSchema.pre('save', (next) => {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(user.password, salt, null, (err, hash) => {
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

// export the model
module.exports = User;
