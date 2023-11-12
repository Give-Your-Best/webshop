const env = require('./environment');

module.exports = {
  apiKey:
    env === 'production'
      ? 'fb3f2d4e229463de31f3ed1a61918875' // TODO - not yet created prod
      : 'fb3f2d4e229463de31f3ed1a61918875',
  releaseStage: env,
  notifyReleaseStages: ['production', 'staging'],
};
