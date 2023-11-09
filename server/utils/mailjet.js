const Mailjet = require('node-mailjet');
const config = require('../config/mailjet');

const mailjet = new Mailjet(config);

module.exports = { mailjet };
