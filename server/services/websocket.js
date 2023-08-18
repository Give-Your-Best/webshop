const { WebSocketServer } = require('ws');

// Set up a headless websocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', () => {
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

// broadcast a message on all connections
const push = (event) => wss.clients.forEach((c) => c.send(event));

exports.init = init;
exports.push = push;
