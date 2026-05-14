"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const Utente_1 = require("./Utente");
class Admin extends Utente_1.Utente {
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
exports.Admin = Admin;
