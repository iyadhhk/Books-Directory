const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {});
    dbDebugger('Connected to the database...');
  } catch (error) {
    dbDebugger(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
