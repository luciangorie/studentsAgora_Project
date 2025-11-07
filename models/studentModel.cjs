var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DBStudent', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    birthdate: Date,
    university: String,
    profiledPicture: String,
}));

