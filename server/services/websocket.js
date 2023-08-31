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

// Set up a headless websocket server
const wss = new WebSocketServer({
  noServer: true,
  verifyClient,
});

// // TODO
// const ping = setInterval(() => {
//   wss.clients.forEach(async (socket) => {
//     // TODO
//     if (socket.isAlive === false) {
//       await Connection.deleteClient(xyz);
//       return socket.terminate();
//     }

//     socket.isAlive = false;
//     socket.send('ping');
//   });
// }, 30000);

// Handles the upgrade request to setup a socket connection
const init = (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
};

// TODO
const push = (id, event) => redis.publish(`notify:${id}`, event);

wss.on('connection', async (socket, req) => {
  // We may want a hearbeat implementation for handling broken connections
  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections

  const { cookie } = req.headers;
  const token = parseToken(cookie);

  const adminChannelMap = {
    admin: '*',
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (clients.has(user.id)) {
      null;
    } else {
      await redis.subscribe(
        `notify:${adminChannelMap[user.kind] || user.id}`,
        (event) => clients.get(user.id).send(event)
      );
    }

    clients.set(user.id, socket);
  } catch (e) {
    console.log(e);
    // socket.terminate();
  }

  // socket.isAlive = true;
  // socket.on('error', console.error);
  // socket.on('pong', heartbeat);
});

wss.on('close', () => clearInterval(ping));

/**
 * API...
 */

exports.init = init;
exports.push = push;
