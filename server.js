require('dotenv').config();
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const { WebSocketServer } = require('ws');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// app.use('/', httpsRedirect());
// app.use(function forceLiveDomain(req, res, next) {
//   // Don't allow user to hit Heroku now that we have a domain
//   var host = req.get('Host');
//   if (host === 'give-your-best-webshop.herokuapp.com') {
//     return res.redirect(301, 'https://shop.giveyourbest.uk');
//   }
//   return next();
// });

const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// connect to the db
mongoose.connect(
  process.env.DB_CONNECTION_URI,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to the db!');
  }
);

// API routes
// anything beginning with "/api" will go into this
app.use('/api', require('./server/routes/api'));

if (process.env.NODE_ENV === 'production') {
  // serve static files
  app.use(express.static('client/build'));

  // handle React routing, return all requests to the React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// TODO
const server = http.createServer(app);

// Set up a headless websocket server that prints any
// events that come in.
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

setInterval(() => {
  wss.clients.forEach((c) =>
    c.send(JSON.stringify({ push: crypto.randomBytes(20).toString('hex') }))
  );
}, 5000);

server.listen(port, () => console.log(`Listening on port ${port}`));
