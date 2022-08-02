require('dotenv').config();
const express = require('express');
var httpsRedirect = require('express-https-redirect');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

app.use(bodyParser.json({ limit: "50mb" }));
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

app.listen(port, () => console.log(`Listening on port ${port}`));
