class PersonalDetails {
    constructor(username,biography, memberof = [], eventsParticipated = []) {
        this.username = username;
        this.biography = biography;
        this.memberof = memberof;
        this.eventsParticipated = eventsParticipated;
    }
}

module.exports = PersonalDetails;