const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//permission descriptions ["Create roles", "Edit users", "Message", "View Notifications", "Assign Locations", "Approve Shoppers", "Approve Donors", " Approve Items", "Upload Products", "Create Locations", "Adjust Shop Settings", "Add Team Members"]

const roleSchema = new Schema({
  name: String,
  permissions: [String],
});
  
//export
module.exports = mongoose.model('Role', roleSchema);