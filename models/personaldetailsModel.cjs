var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('DBPersonalDetails', new Schema({
    username: String,
    biography: String,
    memberof: [String],
    eventsParticipated: [String],
}));

