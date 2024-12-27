const mongoose = require('mongoose');

const db = "determinix";

// Fungsi untuk koneksi ke database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/' + db);
    console.log('MongoDB Connected to ' + db);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

module.exports = connectDB;
