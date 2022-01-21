const Joi = require('joi');

const validateBook = (book) => {
  const { title, author_name, total_pages, rating, publisher_name, published_date } =
    book;
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author_name: Joi.string().min(3).required(),
    total_pages: Joi.number().min(1).required(),
    rating: Joi.number().min(1).max(5).required(),
    publisher_name: Joi.string().min(3).required(),
    published_date: Joi.date().required(),
  });
  return schema.validate({
    title,
    author_name,
    total_pages,
    rating,
    publisher_name,
    published_date,
  });
};

module.exports = validateBook;
