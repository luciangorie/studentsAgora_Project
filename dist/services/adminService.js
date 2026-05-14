"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newregistration = newregistration;
const adminModel_1 = __importDefault(require("../models/adminModel"));
async function newregistration(representative) {
    const email1 = representative.email.toLowerCase();
    const username1 = representative.username.toLowerCase();
    try {
        representative.email = email1;
        representative.username = username1;
        const daSalvare = new adminModel_1.default(representative);
        await daSalvare.save();
        return { success: true, message: 'Registrazione completata con successo!' };
    }
    catch (error) {
        return { success: false, error: `Errore durante la registrazione del representative: ${error}` };
    }
}
