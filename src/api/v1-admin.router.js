const router = require('express').Router();
const { word } = require('faker').lorem;

const books = require('../models/books/books.model.js');
const auth = require('../auth/middleware.js');

router.post(
  '/api/v1/random-book',
  auth('read'),
  auth('create'),
  auth('update'),
  auth('delete'),
  randomBook
);

/**
 * Generate a random book for testing purposes
 * @function
 * @name randomBook
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function randomBook(req, res, next) {
  const book = {
    title: word(),
    author: word(),
    isbn: word(),
    image_url: word(),
    description: word(),
    bookshelf_id: word(),
  };
  books
    .post(book)
    .then(result => res.status(200).send(result))
    .catch(next);
}

module.exports = router;
