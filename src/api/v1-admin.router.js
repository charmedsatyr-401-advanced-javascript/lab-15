'use strict';

const router = require('express').Router();
const { word } = require('faker').lorem;

// Import middleware
const auth = require('../auth/middleware.js');
const modelFinder = require('../middleware/model-finder.js');

// Dynamically evaluate the model
router.param('model', modelFinder);

router.post(
  `/api/v1/:model/random`,
  auth('read'),
  auth('create'),
  auth('update'),
  auth('delete'),
  randomRecord
);

/**
 * Generate a random record for testing purposes
 * TODO: Currently hardcoded to use the `book` model's attributes but could be
 * made more dynamic through dynamic key and value-type setting
 * based on the model's Mongoose schema.
 * BETTER: Similar functionality could be added through a static method on each model.
 * @function
 * @name randomRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function randomRecord(req, res, next) {
  const record = {
    title: word(),
    author: word(),
    isbn: word(),
    image_url: word(),
    description: word(),
    bookshelf: word(),
  };
  req.model
    .post(record)
    .then(result => res.status(200).send(result))
    .catch(next);
}

module.exports = router;
