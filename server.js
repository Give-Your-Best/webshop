require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => console.log(`Listening on port ${port}`));
