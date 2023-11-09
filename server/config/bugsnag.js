const env = require('./environment');

module.exports = {
  apiKey: env === 'production' ? '' : 'fb3f2d4e229463de31f3ed1a61918875', // TODO
  releaseStage: env,
};
