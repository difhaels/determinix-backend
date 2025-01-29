const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');  // Model admin kamu

// Fungsi untuk membuat admin
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash password menggunakan bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat admin baru
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAdmin };
