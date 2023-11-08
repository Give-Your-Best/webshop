require('dotenv').config();
const Bugsnag = require('@bugsnag/js');

// start bugsnag before doing anything more
Bugsnag.start({
  apiKey: 'fb3f2d4e229463de31f3ed1a61918875',
  // appVersion: '',
  // releaseStage: 'development',
  // enabledReleaseStages: [],
});

// and then export it for use elsewhere
module.exports = Bugsnag;
