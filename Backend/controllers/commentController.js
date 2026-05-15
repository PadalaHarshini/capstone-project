const Article = require("../models/Article");
const Comment = require("../models/Comment");

const getCommentsByArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comments = await Comment.find({ articleId: req.params.articleId })
      .populate("userId", "name role")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { articleId, comment } = req.body;

    if (!articleId || !comment) {
      return res.status(400).json({ message: "Article and comment are required" });
    }

    const article = await Article.findById(articleId);
    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    const newComment = await Comment.create({
      articleId,
      userId: req.user._id,
      comment
    });

    const populatedComment = await newComment.populate("userId", "name role");
    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCommentsByArticle, addComment };
