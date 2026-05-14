"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDetails = void 0;
class PersonalDetails {
    constructor(username, biography, memberof = [], eventsParticipated = []) {
        this.username = username;
        this.biography = biography;
        this.memberof = memberof;
        this.eventsParticipated = eventsParticipated;
    }
}
exports.PersonalDetails = PersonalDetails;
