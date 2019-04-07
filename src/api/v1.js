'use strict';

// Create a router instance
const router = require('express').Router();
const auth = require('../auth/middleware.js');
const books = require('../models/books/books-model.js');
const { word } = require('faker').lorem;

router.get('/', (req, res, next) => {
  res.status(200).send('This is the home page!');
});

router.get('/books', getBooks);
router.get('/api/v1/books/:id', getBooks);
router.post('/books', auth('create'), createBook);
router.put('/books/:id', auth('update'), updateBook);
router.patch('/books/:id', auth('update'), patchBook);
router.delete('/books/:id', auth('delete'), deleteBook);
router.post('/test-auto-populate-book', auth('create'), randomBook); // Testing route; creates a mock book with random values

function getBooks(req, res, next) {
  const { id } = req.params;
  books
    .get(id)
    .then(results => res.status(200).send(results))
    .catch(next);
}

function createBook(req, res, next) {
  const { body } = req;
  books
    .post(body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

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

function updateBook(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  books
    .put(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

function patchBook(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  books
    .patch(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

function deleteBook(req, res, next) {
  const { id } = req.params;
  books
    .delete(id)
    .then(result => res.status(200).send(result))
    .catch(next);
}

module.exports = router;
