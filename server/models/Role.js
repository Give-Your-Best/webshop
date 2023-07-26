const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//permission descriptions ["Create roles", "Edit users", "Message", "View Notifications", "Assign Locations", "Approve Shoppers", "Approve Donors", " Approve Items", "Upload Products", "Create Locations", "Adjust Shop Settings", "Add Team Members"]

// db.roles.insertOne( { name: "Developer", permissions: ["Edit users", "Message", "View Notifications", "Assign Locations", "Approve Shoppers", "Approve Donors", " Approve Items", "Upload Products", "Adjust Shop Settings", "Add Team Members"] } );

// db.roles.insertOne( { name: "Top level admin", permissions: ["Edit users", "Message", "View Notifications", "Assign Locations", "Approve Shoppers", "Approve Donors", " Approve Items", "Upload Products", "Adjust Shop Settings", "Add Team Members"] } );

// db.roles.insertOne( { name: "First level admin", permissions: [ "Message", "View Notifications", "Assign Locations", "Approve Shoppers", "Approve Donors", " Approve Items", "Upload Products", "Adjust Shop Settings"] } );

const roleSchema = new Schema({
  name: String,
  permissions: [String],
});

//export
module.exports = mongoose.model('Role', roleSchema);
