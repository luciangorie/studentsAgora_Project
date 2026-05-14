"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utente = void 0;
class Utente {
    constructor() {
        this.name = '-';
        this.surname = '-';
        this.username = 'User';
        this.birthdate = new Date(1899, 0, 1);
        this.email = null;
        this.password = null;
    }
}
exports.Utente = Utente;
