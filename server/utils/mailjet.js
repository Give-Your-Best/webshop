require('dotenv').config();
const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
    apiKey: '39dc5a3675516d08023d9bbf5f642ebc',
    apiSecret: 'e614e7b1ad85e9b7e4fb432a6d2075f4'
});

module.exports = { mailjet };
