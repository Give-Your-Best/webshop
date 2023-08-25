const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const options = { timestamps: true };

const connectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['admin', 'donor', 'shopper'],
    },
  },
  options
);

// TODO
connectionSchema.statics.getAllOfType = async function (type) {
  const connections = await this.find({ type });

  return connections;
};

// TODO
connectionSchema.statics.upsertClient = async function (token) {
  const user = await this.model('User').findById(token._id);

  if (!user) {
    // TODO
  }

  console.log({ user });

  const document = {
    user: user._id,
    type: user.kind,
  };

  const client =
    (await this.findOne(document)) || (await this.create(document));

  return client;
};

// TODO
connectionSchema.statics.deleteClient = async function (id) {
  const client = this.findByIdAndRemove(id, {
    useFindAndModify: false,
  });
  await this.findByIdAndDelete(id);
};

//export
module.exports = mongoose.model('Connection', connectionSchema);
