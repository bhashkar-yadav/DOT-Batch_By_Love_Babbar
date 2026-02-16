const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

// ================= POSTS =================

// Create Post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({ title, content });

        res.status(201).json({
            success: true,
            data: post,
            message: "Post created successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate("comments")
            .populate("likes");

        res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// Get Post By ID
exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId)
            .populate("comments")
            .populate("likes");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// ================= LIKES =================

// Like Post
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // check post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // prevent duplicate like
        const alreadyLiked = await Like.findOne({ post: postId });
        if (alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "Post already liked",
            });
        }

        const like = await Like.create({ post: postId });

        post.likes.push(like._id);
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post liked successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// Unlike Post
exports.unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // check post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // check like exists
        const like = await Like.findOne({ post: postId });
        if (!like) {
            return res.status(400).json({
                success: false,
                message: "Post is not liked yet",
            });
        }

        // delete like
        await Like.findByIdAndDelete(like._id);

        // remove like reference
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: like._id },
        });

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// ================= COMMENTS =================

// Create Comment
exports.createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        // check post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const comment = await Comment.create({
            text,
            post: postId,
        });

        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({
            success: true,
            data: comment,
            message: "Comment added successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// Get Comments of a Post
exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId });

        res.status(200).json({
            success: true,
            data: comments,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};
