const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Admin = require("../models/admin");
const { createAdmin } = require("../controllers/adminController"); // Pastikan path benar
const verifyToken = require("../middleware/authJWT");

// Rute untuk menambahkan admin
router.post("/register", createAdmin);

// rute login admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not Found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Pw" });

    // buat jwt token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint hanya bisa diakses admin yang login
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

module.exports = router;
