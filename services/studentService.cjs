const DBStudent = require('../models/studentModel.cjs');

async function newregistration(student) {
    var email1 = student.email.toLowerCase();
    var username1 = student.username.toLowerCase();
    //check existence of email ALREADY IN USE
    try {
        student.email = email1;
        student.username = username1;
        const daSalvare = new DBStudent(student);
        await daSalvare.save();
        const msg = "Registrazione completata con successo!";
        //console.log(msg);
        return { success: true, message: msg };
    } catch (error) {
        const msg = `Errore durante la registrazione dello studente: ${error}`; 
        //console.error(msg);
        return { success: false, error: msg };
    }
}

module.exports = { newregistration };
    