const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');

// TODO
const verifyClient = ({ req }, cb) => {
  const cookies = new URLSearchParams(req.headers.cookie);

  if (!cookies.has('jwt_user')) {
    return cb(false, 401, 'Unauthorized');
  }

  const token = cookies.get('jwt_user');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log({ decoded });

  if (!decoded) {
    return cb(false, 401, 'Unauthorized');
  }

  cb(true);
};

// Set up a headless websocket server
const wss = new WebSocketServer({
  noServer: true,
  verifyClient,
});

wss.on('connection', (socket, req) => {
  // Here we will verify tokens, store connections etc.
  // We may want client subscription 'channels' for different event classes
  // We may want a hearbeat implementation for handling broken connections
  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
  // Currently this is intended as a server push implementation only, so we do
  // not need to handle the connection socket 'message' events...
});

// API

// Handles the upgrade request to setup a socket connection
const init = (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
};

// Broadcast a message on all connections
const push = (event) => wss.clients.forEach((c) => c.send(event));

exports.init = init;
exports.push = push;
