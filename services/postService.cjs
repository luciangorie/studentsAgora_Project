const DBPost = require('../models/postmodel.cjs');

async function createPost(postData) {
    try {
        const newPost = new DBPost(postData);
        await newPost.save();
        return { success: true, data: newPost };
    }
    catch (error) {
        console.error(`Mistake: ${error}`);
        return { success: false, error: `Unsuccessfull: ${error}` };
    }
}

async function getAllPosts() {
    try {
        const posts = await DBPost.find().sort({ date: -1 });
        return posts;
    } catch (error) {
        console.error(`Error fetching posts: ${error}`);
        throw error;
    }
}

module.exports = { createPost, getAllPosts };