"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalDetailsByusername = getPersonalDetailsByusername;
exports.savenewPersonalDetails = savenewPersonalDetails;
const personaldetailsModel_1 = __importDefault(require("../models/personaldetailsModel"));
async function getPersonalDetailsByusername(username) {
    try {
        return await personaldetailsModel_1.default.findOne({ username }).exec();
    }
    catch (error) {
        console.error(`Error fetching personal details for username ${username}:`, error);
        throw error;
    }
}
async function savenewPersonalDetails(username, biography, memberof = [], eventsParticipated = []) {
    try {
        const newDetails = new personaldetailsModel_1.default({ username, biography, memberof, eventsParticipated });
        await newDetails.save();
        return newDetails;
    }
    catch (error) {
        console.error('Error creating personal details:', error);
        throw error;
    }
}
