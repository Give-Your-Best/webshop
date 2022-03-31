#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');
const Item = require('./server/models/Item');
const users = require('./dummy_users_data.json');
const items = require('./dummy_items_data.json');

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

// users.forEach((user) => {
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

items.forEach((item) => {
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