'use strict';

// 3rd party resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Catchalls
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');

// Prepare the Express app
const app = express();

// App level middleware
app.use(cors());
app.use(morgan('dev'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.get('/', (req, res, next) => {
  res.status(200).send('Server up and running...');
});

// Error route
const DEV = process.env.NODE_ENV && 'development';
if (DEV) {
  const forceErr = (req, res, next) => next('Error!');
  app.get('/error', forceErr);
}

// Catchalls
app.use('*', notFound);
app.use(serverError);

let isRunning = false;

module.exports = {
  server: app,
  start: port => {
    if (!isRunning) {
      app.listen(port, () => {
        console.log(`Server up on port ${port}...`);
      });
    } else {
      console.log('Server is already running...');
    }
  },
};
