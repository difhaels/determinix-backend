const express = require("express");
const router = express.Router();
const Activities = require("../models/activities");

router.get("/", async (req, res) => {
  try {
    const projects = await Activities.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;