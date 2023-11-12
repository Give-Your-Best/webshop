const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');
const config = require('../config/bugsnag');

Bugsnag.start({
  ...config,
  plugins: [BugsnagPluginExpress],
});

module.exports = Bugsnag;
