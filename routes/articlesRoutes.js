const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");

// mendapatkan semua artikel
router.get("/", async (req, res) => {
  try {
    const articles = await Articles.find().populate("writer");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mendapatkan artikerl berdasarkan id
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    const activity = await Articles.findById(id).populate("writer");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mendapatkan artikel berdasarkan member
router.get("/ma/:id", async (req, res) => {
  const { id } = req.params; // minta id dari url 
  try {
    const articles = await Articles.find({ writer: id }).populate("writer");
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles by this member is not found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mendapatkan artikel berdasarkan type
router.get("/type/:name", async (req, res) => {
  const { name } = req.params; // minta type dari url frontend
  try {
    const articles = await Articles.find({ type: name }).populate("writer");
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles by this member is not found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
