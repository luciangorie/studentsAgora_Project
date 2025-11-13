// API per ottenere username da email (student)
const StudentModel = require('../models/studentModel.cjs');

const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../passwordmanager.cjs');
const Admin = require('../classes/Admin.cjs');
const AdminService = require('../services/adminService.cjs');
const Student = require('../classes/Student.cjs');
const StudentService = require('../services/studentService.cjs');





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

router.post('/student-registrazione', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, birthdate, university, profiledPicture } = req.body;
        if (!firstName || !lastName || !email || !username || !password || !birthdate || !university || !profiledPicture) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await hashPassword(password);
        const student = new Student(firstName, lastName, email, username, hashedPassword, birthdate, university, profiledPicture);
        const result = await StudentService.newregistration(student);
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

router.get('/getidbyemail', async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, error: 'Email required' });
    try {
        const student = await StudentModel.findOne({ email: email.toLowerCase() });
        if (student) return res.json({ success: true, id: student.username });
        return res.status(404).json({ success: false, error: 'Not found' });
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});


module.exports = router;
//esporto api legate a recupero account