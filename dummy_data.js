#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');
const Item = require('./server/models/Item');
const Location = require('./server/models/Location');
const users = require('./dummy_users_data.json');
const items = require('./dummy_items_data.json');
const locations = require('./dummy_locations_data.json');
const users_new = require('./dummy_users.json');
const items_new = require('./dummy_items.json');

// connect to the db
mongoose.connect(
    process.env.DB_CONNECTION_URI,
    { useNewUrlParser: true },
    () => {
      console.log('Connected to the db!');
    }
  );

/**************************
Script to add dummy data
***************************/

// users_new.forEach((user) => {
//     if (user.type == 'donor') {
//         user = new User.Donor(user);
//     } else if (user.type == "shopper") {
//         user = new User.Shopper(user);
//     } else if (user.type == "admin") {
//         user = new User.Admin(user);
//     }
//     user.save(err=>{
//         if (err) {
//             console.log(err)
//           throw Error(err);
//         } else {
//           return { success: true, message: 'User created' }
//         }
//     })
// })

items_new.forEach((item) => {
    item = new Item(item);
    item.save(err=>{
        if (err) {
            console.log(err)
          throw Error(err);
        } else {
          return { success: true, message: 'Item created' }
        }
    })
})

// locations.forEach((item) => {
//   item = new Location(item);
//   item.save(err=>{
//       if (err) {
//           console.log(err)
//         throw Error(err);
//       } else {
//         return { success: true, message: 'Location created' }
//       }
//   })
// })