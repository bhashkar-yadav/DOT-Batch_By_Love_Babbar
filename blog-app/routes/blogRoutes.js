const express = require("express");
const router = express.Router();

const {
    createPost,
    getAllPosts,
    getPostById,
    likePost,
    unlikePost,
    createComment,
    getCommentsByPost,
} = require("../controllers/blogController");

// POSTS
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:postId", getPostById);

// LIKES
router.post("/posts/:postId/like", likePost);
router.post("/posts/:postId/unlike", unlikePost);

// COMMENTS
router.post("/posts/:postId/comments", createComment);
router.get("/posts/:postId/comments", getCommentsByPost);

module.exports = router;
