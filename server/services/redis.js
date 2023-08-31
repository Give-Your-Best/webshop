const redis = require('redis');

// TODO config, authentication etc.
const endpoint = process.env.REDIS_ENDPOINT_URL || '127.0.0.1:6379';
const password = process.env.REDIS_PASSWORD || null;
const [host, port] = endpoint.split(':');

const pub = redis.createClient(Number(port), host);
const sub = redis.createClient(
  Number(port),
  host,
  password ? { password } : undefined
);

(async () => {
  await pub.connect();
  await sub.connect();
})();

/**
 * API...
 */

exports.publish = async (channel, message) => {
  await pub.publish(channel, message);
};

exports.subscribe = async (pattern, listener) => {
  await sub.pSubscribe(pattern, listener);
};

exports.unsubscribe = async (pattern, listener) => {
  await sub.pUnsubscribe(pattern, listener);
};
