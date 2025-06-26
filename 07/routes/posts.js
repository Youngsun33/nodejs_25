const express = require("express");
const router = express.Router();
const postControllter = require("../controllers/posts");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

router.post("/", uploadMultiple, postControllter.createPosts);
router.get("/", postControllter.getAllPost);
router.get("/:id", postControllter.getPostById);
router.put("/:id", postControllter.updatePost);
router.delete("/:id", postControllter.deletePost);

router.post("/:postId/comments", postControllter.createComment);
router.get("/:postId/comments", postControllter.getCommentAll);
router.get("/:postId/comments/:id", postControllter.getCommentById);
router.put("/:postId/comments/:id", postControllter.updateComment);
router.delete("/:postId/comments/:id", postControllter.deleteComment);

module.exports = router;
