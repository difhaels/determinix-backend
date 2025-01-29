const express = require("express");
const router = express.Router();
const {
  getAllArticle,
  getArticleById,
  getArticleByMember,
  getArticleByType,
} = require("../controllers/articleController");

// mendapatkan semua artikel
router.get("/", getAllArticle);

// mendapatkan artikerl berdasarkan id
router.get("/:id", getArticleById);

// mendapatkan artikel berdasarkan member
router.get("/ma/:id", getArticleByMember);

// mendapatkan artikel berdasarkan type
router.get("/type/:name", getArticleByType);

module.exports = router;
