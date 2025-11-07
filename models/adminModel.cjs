var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('DBRepresentative', new Schema({ 
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    birthdate: Date,
    university: String,
    begin: Date,
}));
