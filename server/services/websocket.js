const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');
const Connection = require('../models/Connection');

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

// Set up a headless websocket server
const wss = new WebSocketServer({
  noServer: true,
  verifyClient,
});

wss.on('connection', async (socket, req) => {
  // We may want a hearbeat implementation for handling broken connections
  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections

  const { cookie } = req.headers;
  const token = parseToken(cookie);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Connection.upsertClient(decoded);
    clients.set(decoded._id, socket);
  } catch (e) {
    console.log(e);
    // socket.destroy();
  }
});

// Handles the upgrade request to setup a socket connection
const init = (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
};

// Broadcast a message on all connections
const cast = (event) => wss.clients.forEach((c) => c.send(event));

// Broadcast a message on all connections
const push = (ids, event) =>
  ids.forEach((id) => clients.get(String(id)).send(event));

/**
 * API...
 */

exports.init = init;
exports.cast = cast;
exports.push = push;
