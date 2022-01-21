const express = require('express');
const router = express.Router();

const book = require('../controllers/book');

// GET the List of books
router.get('/', book.getAllBooks);

// GET one Book by ID
router.get('/:id', book.getBookById);

// POST = create a new Book
router.post('/', book.createBook);

// PUT = edit an existing Book
router.put('/:id', book.editBook);

//DELETE a Book
router.delete('/:id', book.deleteBook);

module.exports = router;
