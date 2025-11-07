const DBRepresentative = require('../models/adminModel.cjs');

async function newregistration(representative) {
    console.log('=== DEBUG ADMIN SERVICE ===');
    console.log('1. Rappresentante ricevuto:', representative);
    var email1 = representative.email.toLowerCase();
    var username1 = representative.username.toLowerCase();
    
    //check existence of email ALREADY IN USE
    
    try {
        representative.email = email1;
        representative.username = username1;
        const daSalvare = new DBRepresentative(representative);
        await daSalvare.save();
        const msg = "Registrazione completata con successo!";
        console.log(msg);
        return { success: true, message: msg };
    } catch (error) {
        const msg = `Errore durante la registrazione del representative: ${error}`;
        console.error(msg);
        return { success: false, error: msg };
    }
}




module.exports = { newregistration };