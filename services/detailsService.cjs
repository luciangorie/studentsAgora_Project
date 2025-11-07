const DBPersonalDetails = require('../models/personaldetailsModel.cjs');

async function getPersonalDetailsByusername(username) {
    try {
        const details = await DBPersonalDetails.findOne({ username: username }).exec();
        return details;
    } catch (error) {
        console.error(`Error fetching personal details for username ${username}:`, error);
        throw error;
    }
}

async function savenewPersonalDetails(username,biography, memberof = [], eventsParticipated = []    ) {
    try {
        const newDetails = new DBPersonalDetails({
            username,
            biography,
            memberof,
            eventsParticipated
        });
        await newDetails.save();
        return newDetails;
    } catch (error) {
        console.error('Error creating personal details:', error);
        throw error;
    }
}

module.exports = { getPersonalDetailsByusername,savenewPersonalDetails};