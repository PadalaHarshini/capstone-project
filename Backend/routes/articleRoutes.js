const express = require("express");
const {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  restoreArticle,
  updateArticle
} = require("../controllers/articleController");
const { optionalProtect, protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", optionalProtect, getArticles);
router.get("/:id", getArticleById);
router.post("/", protect, authorizeRoles("AUTHOR", "ADMIN"), createArticle);
router.put("/:id", protect, authorizeRoles("AUTHOR", "ADMIN"), updateArticle);
router.delete("/:id", protect, authorizeRoles("AUTHOR", "ADMIN"), deleteArticle);
router.patch("/:id/restore", protect, authorizeRoles("ADMIN"), restoreArticle);

module.exports = router;
