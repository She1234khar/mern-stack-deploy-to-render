const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

module.exports = main;
