const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
// anything beginning with "/api" will go into this
app.use('/api', require('./routes/api'));

if (process.env.NODE_ENV === 'production') {
  // serve static files
  app.use(express.static('client/build'));

  // handle React routing, return all requests to the React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
