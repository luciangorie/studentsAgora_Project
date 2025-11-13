const express = require('express');
const router = express.Router();
const PostService = require('../services/postService.cjs');

router.post('/create', async (req, res) => {
    const postData = req.body;
    const result = await PostService.createPost(postData);
    if (result.success) {
        res.status(201).json({ success: true, data: result.data });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

router.get('/allposts', async (req, res) => {
    try {
        const posts = await PostService.getAllPosts();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch posts' });
    }
});

module.exports = router;