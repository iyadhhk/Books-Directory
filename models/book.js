const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author_name: { type: String, required: true },
    total_pages: { type: Number, required: true },
    rating: { type: Number, required: true },
    publisher_name: { type: String, required: true },
    published_date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
