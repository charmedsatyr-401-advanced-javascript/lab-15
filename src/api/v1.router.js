'use strict';

// Create a router instance
const router = require('express').Router();
const auth = require('../auth/middleware.js');
const books = require('../models/books/books.model.js');

router.get('/', home);
router.get('/api/v1/books', getBooks);
router.get('/api/v1/books/:id', getBooks);
router.post('/api/v1/books', auth('create'), createBook);
router.put('/api/v1/books/:id', auth('update'), updateBook);
router.patch('/api/v1/books/:id', auth('update'), patchBook);
router.delete('/api/v1/books/:id', auth('delete'), deleteBook);

/**
 * Display a home page
 * @function
 * @name home
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function home(req, res, next) {
  res.status(200).send('Welcome to the home page!');
}

/**
 * Get all books or one book
 * @function
 * @name getBooks
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function getBooks(req, res, next) {
  const { id } = req.params;
  books
    .get(id)
    .then(results => res.status(200).send(results))
    .catch(next);
}

/**
 * Create a new book
 * @function
 * @name createBook
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function createBook(req, res, next) {
  const { body } = req;
  books
    .post(body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

/**
 * Update a book - upserts if the record does not exist
 * @function
 * @name updateBook
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function updateBook(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  books
    .put(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

/**
 * Patch a new book - does not upsert
 * @function
 * @name patchBook
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function patchBook(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  books
    .patch(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
}

/**
 * Delete a book
 * @function
 * @name deleteBook
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 **/
function deleteBook(req, res, next) {
  const { id } = req.params;
  books
    .delete(id)
    .then(result => res.status(200).send(result))
    .catch(next);
}

module.exports = router;
