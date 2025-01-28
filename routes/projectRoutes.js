const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("members"); // Populate untuk menampilkan data member
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;