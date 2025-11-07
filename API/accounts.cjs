const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../passwordmanager.cjs');
const Admin = require('../classes/Admin.cjs');
const AdminService = require('../services/adminService.cjs');






router.post('/admin-registrazione', async (req, res) => {
    try {

        const { firstName, lastName, email, username, password, birthdate, university, begin } = req.body;

        if (!firstName || !lastName || !email || !username || !password || !birthdate || !university || !begin) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await hashPassword(password);
        const representative = new Admin(firstName, lastName, email, username, hashedPassword, birthdate, university, begin);
        const result = await AdminService.newregistration(representative);
    if (result.success) {
        res.status(201).json({ success: true, message: result.message });
    } else {
    res.status(400).json({ success: false, error: result.error });
    } 
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ error: 'Errore del server' });
    }
    }
);
module.exports = router;
//esporto api legate a recupero account