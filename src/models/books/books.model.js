'use strict';

const ModelClass = require('../model.model.js');
const BooksSchema = require('./books.schema.js');

class BooksModel extends ModelClass {}

module.exports = new BooksModel(BooksSchema);
