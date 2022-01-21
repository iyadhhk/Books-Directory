const Book = require('../models/book');

// get the list of books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
  }
};

// get a book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found');

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

//create new book
exports.createBook = async (req, res, next) => {
  const { title, author_name, total_pages, rating, publisher_name, published_date } =
    req.body;
  // const { error } = validateBook(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  try {
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
    console.log(error);
  }
};

// update a book
exports.editBook = async (req, res, next) => {
  try {
    // const book = books.find((b) => b.id === parseInt(req.params.id));
    const {
      id,
      title,
      author_name,
      total_pages,
      rating,
      publisher_name,
      published_date,
    } = req.body;
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

    // const { error } = validateBook(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    res.send(book);
  } catch (error) {
    console.log(error);
  }
};
const validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name: book.name });
};

// delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found');

    res.send(book);
  } catch (error) {}
};
