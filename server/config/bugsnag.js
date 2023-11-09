module.exports = {
  apiKey: process.env.BUGSNAG_KEY,
  releaseStage: process.env.NODE_ENV || 'development',
};
