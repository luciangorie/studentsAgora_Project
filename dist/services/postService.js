"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
const postModel_1 = __importDefault(require("../models/postModel"));
async function createPost(postData) {
    try {
        const newPost = new postModel_1.default(postData);
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
        return await postModel_1.default.find().sort({ date: -1 });
    }
    catch (error) {
        console.error(`Error fetching posts: ${error}`);
        throw error;
    }
}
