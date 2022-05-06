const express = require("express");
const router = express.Router();

// Models
const Post = require("../models/Post");

// Middleware
const verifyToken = require("../middleware/auth");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Validation
  if (!title)
    return res.status(400).json({ success: false, message: "Missing title" });

  try {
    const newPost = new Post({
      title,
      description,
      url:
        url.startsWith("https://") || url.startsWith("http://")
          ? url
          : `https://${url}`,
      status: status || "To Learn",
      user: req.userId,
    });

    await newPost.save();

    res
      .status(200)
      .json({ success: true, message: "Happy leaning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
    res.json({ success: true, posts })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// @route PUT api/posts
// @desc Update posts
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body

  // Validation
  if (!title)
    return res.status(400).json({ success: false, message: "Missing title" });

  try {
    let updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith("https://") || url.startsWith("http://") ? url : `https://${url}`) || '',
      status: status || 'TO LEARN'
    }

    const postUpdateCondition = { _id: req.params.id, user: req.userId }

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    )

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
    
    res.json({success: true, message: 'Post updated successfully', post: updatedPost})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

})

// @route DELETE api/posts
// @desc Delete posts
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)

    // User not authorised to update post or post not found
    if (!deletePost)
      return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
    
    res.json({success: true, message: 'Post deleted successfully'})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})



module.exports = router;
