"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newregistration = newregistration;
exports.getByUsername = getByUsername;
const studentModel_1 = __importDefault(require("../models/studentModel"));
async function newregistration(student) {
    const email1 = student.email.toLowerCase();
    const username1 = student.username.toLowerCase();
    try {
        student.email = email1;
        student.username = username1;
        const daSalvare = new studentModel_1.default(student);
        await daSalvare.save();
        return { success: true, message: 'Registrazione completata con successo!' };
    }
    catch (error) {
        return { success: false, error: `Errore durante la registrazione dello studente: ${error}` };
    }
}
async function getByUsername(username) {
    try {
        return await studentModel_1.default.findOne({ username });
    }
    catch (error) {
        console.error(`Errore durante il recupero dello studente: ${error}`);
        throw error;
    }
}
