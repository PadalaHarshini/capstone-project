const express = require("express");
const {
  addComment,
  getCommentsByArticle
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/:articleId", getCommentsByArticle);
router.post("/", protect, authorizeRoles("USER", "AUTHOR", "ADMIN"), addComment);

module.exports = router;
