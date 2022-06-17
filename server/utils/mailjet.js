require('dotenv').config();
const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_KEY,
    apiSecret: process.env.MAILJET_SECRET
});

module.exports = { mailjet };