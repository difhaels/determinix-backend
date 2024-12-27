const express = require('express');
const connectDB = require('./database/db');
const Member = require('./models/member');

const app = express();
const PORT = 5000;

// Koneksi ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk mendapatkan data anggota
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
