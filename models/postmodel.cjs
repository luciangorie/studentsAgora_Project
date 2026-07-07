var mongoose= require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DBPost', new Schema({
    picture: String,
    text: String,
    likes: Number,
    comments: [String],
    date: Date,
    author: String,
    hashtags: [String],
    location: String,
    faceCount: { type: Number, default: null },
}));

