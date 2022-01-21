const startupDebugger = require('debug')('app:startup');
const connectDB = require('./config/db');

const helmet = require('helmet');
const morgan = require('morgan');
const books = require('./routes/books');
const cors = require('cors');
const express = require('express');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

// Books API
app.use('/api/books', books);

// custom error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(statusCode).json({ message, data });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
