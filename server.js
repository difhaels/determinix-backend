const cors = require('cors');
const express = require('express');
const connectDB = require('./database/db');
const Member = require('./models/member');
const Project = require('./models/project');

const app = express();
const PORT = 5000;

app.use(cors());

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

// Endpoint untuk mendapatkan project beserta anggota yang terhubung
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('members'); // Populate untuk menampilkan data member
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
