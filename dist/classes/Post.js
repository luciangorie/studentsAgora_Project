"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(picture, text, likes = 0, comments = [], date, author, togetherwith = [], hashtags = []) {
        this.picture = picture;
        this.text = text;
        this.likes = likes;
        this.comments = comments;
        this.date = date;
        this.author = author;
        this.togetherwith = togetherwith;
        this.hashtags = hashtags;
    }
}
exports.Post = Post;
