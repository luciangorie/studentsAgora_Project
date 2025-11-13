var mongoose= require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DBPost', new Schema({
    picture: String,
    text: String,
    likes: Number,
    comments: [String],
    date: Date,
    author: String,
    togetherwith: [String],
    hashtags: [String],
}));

