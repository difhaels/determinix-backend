const Article = require("../models/article");

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find().populate("writer");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    const activity = await Article.findById(id).populate("writer");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByMember = async (req, res) => {
  const { id } = req.params; // minta id dari url
  try {
    const articles = await Article.find({ writer: id }).populate("writer");
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles by this member is not found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByType = async (req, res) => {
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
};

module.exports = {
  getAllArticle,
  getArticleById,
  getArticleByMember,
  getArticleByType,
};
