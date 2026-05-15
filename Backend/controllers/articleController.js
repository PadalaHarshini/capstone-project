const Article = require("../models/Article");

const getArticles = async (req, res, next) => {
  try {
    const { includeDeleted, mine } = req.query;
    const query = {};

    if (req.user?.role !== "ADMIN" || includeDeleted !== "true") {
      query.isDeleted = false;
    }

    if (mine === "true" && req.user) {
      query.author = req.user._id;
    }

    const articles = await Article.find(query)
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email role"
    );

    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, description, content, imageUrl, category } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const article = await Article.create({
      title,
      description,
      content,
      imageUrl: imageUrl || "",
      category,
      author: req.user._id
    });

    const populatedArticle = await article.populate("author", "name email role");
    res.status(201).json(populatedArticle);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    const isOwner = article.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to update this article" });
    }

    const allowedFields = ["title", "description", "content", "imageUrl", "category"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        article[field] = req.body[field];
      }
    });

    await article.save();
    const populatedArticle = await article.populate("author", "name email role");
    res.json(populatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    const isOwner = article.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to delete this article" });
    }

    article.isDeleted = true;
    await article.save();

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const restoreArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.isDeleted = false;
    await article.save();

    res.json({ message: "Article restored successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  restoreArticle
};
