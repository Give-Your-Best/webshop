require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sockets = require('./server/services/websocket');

const Bugsnag = require('./server/utils/bugsnag');

const app = express();

const { requestHandler, errorHandler } = Bugsnag.getPlugin('express');

const port = process.env.PORT || 5000;

app.use(requestHandler);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Establish the database connection
(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to the database');
  } catch (err) {
    Bugsnag.notify(err);
  }
})();

// API routes
// anything beginning with "/api" will go into this
app.use('/api', require('./server/routes/api'));

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // serve static files
  app.use(express.static('client/build'));

  // handle React routing, return all requests to the React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Register the websocket server on http upgrade events
server.on('upgrade', sockets.init);
