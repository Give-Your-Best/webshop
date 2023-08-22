const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');

// Verify the jwt cookie in the handshake request
const verifyClient = ({ req }, cb) => {
  const { cookie } = req.headers;

  // This will just grab the value of the 'jwt_user' cookie set on login
  const [, token] = /jwt_user=(.+);?/.exec(cookie);

  if (!token) {
    return cb(false, 401, 'Unauthorized');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

wss.on('connection', () => {
  // We may want a hearbeat implementation for handling broken connections
  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
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
