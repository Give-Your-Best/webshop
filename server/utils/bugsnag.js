const Bugsnag = require('@bugsnag/js');
const config = require('../config/bugsnag');

Bugsnag.start(config);

module.exports = Bugsnag;
