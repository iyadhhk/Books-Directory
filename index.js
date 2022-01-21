const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const connectDB = require('./config/db');

const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const books = require('./routes/books');
const express = require('express');
const cors = require('cors');
const app = express();
connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/books', books);
// configuration
console.log('application name', config.get('name'));
console.log('mail server', config.get('mail.host'));
// console.log('mail Password', config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}
// db work ...
dbDebugger('Connected to the database...');

app.get('/', (req, res) => {
  res.send('hello world');
});

// app.post();
// app.put();
// app.delete();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
