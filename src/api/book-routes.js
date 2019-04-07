'use strict';

// Create a router instance
const express = require('express');
const router = express.Router();

// temp
const auth = capabilities => {
  capabilities;
  return (req, res, next) => {
    next();
  };
};

router.get('/', (req, res, next) => {
  res.status(200).send('This is the home page!');
});

router.get('/books', (req, res, next) => {
  res.status(200).send('This is where you get all the books.');
});

router.get('/books/:id', (req, res, next) => {
  res.status(200).send('This is where you get one book.');
});

router.post('/books', auth('create'), (req, res, next) => {
  res.status(200).send('This is where you add a book');
});

router.put('/books/:id', auth('update'), (req, res, next) => {
  res.status(200).send('this is where you edit a book');
});

router.patch('/books/:id', auth('update'), (req, res, next) => {
  res.status(200).send('This is where you fix a book');
});

router.delete('/books/:id', auth('delete'), (req, res, next) => {
  res.status(200).send('This is where you delete a book.');
});

module.exports = router;
