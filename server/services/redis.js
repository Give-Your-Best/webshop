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

exports.publish = (channel, message) => pub.publish(channel, message);
exports.subscribe = (pattern, listener) => sub.pSubscribe(pattern, listener);
