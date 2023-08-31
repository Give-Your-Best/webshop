const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');
const { User } = require('../models/User');
const redis = require('./redis');

const clients = new Map();

// This will just grab the value of the 'jwt_user' cookie set on login
const parseToken = (cookie) => {
  const [, result] = /jwt_user=(.+);?/.exec(cookie);
  return result;
};

// Verify the jwt cookie in the handshake request
const verifyClient = ({ req }, cb) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return cb(false, 401, 'Unauthorized');
  }

  const token = parseToken(cookie);

  if (!token) {
    return cb(false, 401, 'Unauthorized');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return cb(false, 401, 'Unauthorized');
  }

  cb(true);
};

// TODO
const heartbeat = (socket) => (socket.isAlive = true);

// Set up a headless websocket server
const wss = new WebSocketServer({
  noServer: true,
  verifyClient,
});

// TODO
const ping = setInterval(() => {
  clients.forEach((socket) => {
    if (socket.isAlive) {
      socket.isAlive = false;
      socket.ping();
    } else {
      socket.terminate();
    }
  });
}, 30000);

// Handles the upgrade request to setup a socket connection
const init = (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
};

// TODO
const push = async (id, event) => await redis.publish(`notify:${id}`, event);

wss.on('connection', async (socket, req) => {
  // We may want a hearbeat implementation for handling broken connections
  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections

  const { cookie } = req.headers;
  const token = parseToken(cookie);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    const channel = `notify:${{ admin: '*' }[user.kind] || user.id}`;
    const listener = (event) => clients.get(user.id).send(event);

    // Register the message listener - we only want to do this once else there
    // will be multiple channel listeners per user so check that the connection
    // user is not already in the active clients store...
    if (clients.has(user.id)) {
      null;
    } else {
      await redis.subscribe(channel, listener);
    }

    // Register the client in local memory
    clients.set(user.id, socket);

    socket.isAlive = true;

    // Bind client socket events
    socket.on('pong', heartbeat);
    socket.on('error', console.error); // TODO better than this
    socket.on('close', async () => {
      clients.delete(user.id);
      await redis.unsubscribe(channel, listener);
    });
  } catch (e) {
    socket.terminate();
  }
});

wss.on('close', () => clearInterval(ping));

/**
 * API...
 */

exports.init = init;
exports.push = push;
