const Pusher = require('pusher');
const config = require('../config/pusher');

const pusher = new Pusher(config);

module.exports = pusher;
