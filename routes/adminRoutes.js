const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const { createAdmin } = require("../controllers/adminController"); // Pastikan path benar

// Rute untuk menambahkan admin
router.post("/register", createAdmin);

module.exports = router;