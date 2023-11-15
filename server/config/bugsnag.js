const env = require('./environment');

module.exports = {
  apiKey:
    env === 'production'
      ? '38171f6c0c506918a19deac49c1a5a19'
      : 'fb3f2d4e229463de31f3ed1a61918875',
  releaseStage: env,
  enabledReleaseStages: ['production', 'staging'],
};
