const Utente = require('./Utente.cjs');

class Admin extends Utente {
    constructor(firstName, lastName, email, username, password, birthdate, university, begin) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.birthdate = birthdate;
        this.university = university;
        this.begin = begin;
    }

}

module.exports = Admin;