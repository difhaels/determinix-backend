const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");

router.get("/", async (req, res) => {
  try {
    const articles = await Articles.find().populate("writer");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;