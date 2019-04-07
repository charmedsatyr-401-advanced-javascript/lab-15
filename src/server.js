'use strict';

/**
 * Server module - Integrates the logic of the application
 * and exports the Express `app` instance and `start` method.
 * @module src/server
 **/

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
const adminRouter = require('./api/admin.js'); // Routes intended for admin use
app.use(adminRouter);

const authRouter = require('./auth/router.js');
app.use(authRouter);

const bookRoutes = require('./api/v1.js');
app.use(bookRoutes);

// Catchalls
app.use('*', notFound);
app.use(serverError);

let isRunning = false;

/**
 * Exported function to start the Express server
 * @param port {number} Port used for the server
 */
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
