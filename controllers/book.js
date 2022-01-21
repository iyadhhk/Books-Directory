const Book = require('../models/book');
const validateBook = require('../utils/validateBook');

// get the list of books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// get a book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found');

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

//create new book
exports.createBook = async (req, res, next) => {
  try {
    const { title, author_name, total_pages, rating, publisher_name, published_date } =
      req.body;
    const { error } = validateBook(req.body);
    if (error) {
      console.log(error);
      const err = new Error('validation failed');
      err.statusCode = 400;
      err.data = error.details.map((err) => err.message);
      throw err;
    }
    const newBook = new Book({
      title,
      author_name,
      total_pages,
      rating,
      publisher_name,
      published_date,
    });
    const result = await newBook.save();
    res.status(201).json({
      message: 'New book created',
      bookId: result._id,
    });
  } catch (error) {
    next(error);
  }
};

// update a book
exports.editBook = async (req, res, next) => {
  try {
    const {
      id,
      title,
      author_name,
      total_pages,
      rating,
      publisher_name,
      published_date,
    } = req.body;
    const { error } = validateBook(req.body);
    if (error) {
      console.log(error);
      const err = new Error('validation failed');
      err.statusCode = 400;
      err.data = error.details.map((err) => err.message);
      throw err;
    }
    const book = await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          author_name,
          total_pages,
          rating,
          publisher_name,
          published_date,
        },
      },
      { new: true }
    );
    if (!book) return res.status(404).send('The book with the given ID was not found');

    res.status(201).json({
      message: 'Book updated',
      book,
    });
  } catch (error) {
    next(error);
  }
};

// delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found');
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
