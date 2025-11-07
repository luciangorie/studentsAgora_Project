const Utente = require('./Utente.cjs');

class Student extends Utente {
    constructor(firstName, lastName, email, username, password, birthdate, university, profiledPicture) 
    {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.birthdate = birthdate;
        this.university = university;
        this.profiledPicture = profiledPicture;
    }
}

module.exports = Student;