"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passwordmanager_1 = require("../passwordmanager");
const Admin_1 = require("../classes/Admin");
const AdminService = __importStar(require("../services/adminService"));
const Student_1 = require("../classes/Student");
const StudentService = __importStar(require("../services/studentService"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const router = (0, express_1.Router)();
router.post('/admin-registrazione', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, birthdate, university, begin } = req.body;
        if (!firstName || !lastName || !email || !username || !password || !birthdate || !university || !begin) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await (0, passwordmanager_1.hashPassword)(password);
        const representative = new Admin_1.Admin(firstName, lastName, email, username, hashedPassword, new Date(birthdate), university, new Date(begin));
        const result = await AdminService.newregistration(representative);
        if (result.success) {
            return res.status(201).json({ success: true, message: result.message });
        }
        return res.status(400).json({ success: false, error: result.error });
    }
    catch (error) {
        console.error('Errore durante la registrazione:', error);
        return res.status(500).json({ error: 'Errore del server' });
    }
});
router.post('/student-registrazione', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, birthdate, university, profiledPicture } = req.body;
        if (!firstName || !lastName || !email || !username || !password || !birthdate || !university || !profiledPicture) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await (0, passwordmanager_1.hashPassword)(password);
        const student = new Student_1.Student(firstName, lastName, email, username, hashedPassword, new Date(birthdate), university, profiledPicture);
        const result = await StudentService.newregistration(student);
        if (result.success) {
            return res.status(201).json({ success: true, message: result.message });
        }
        return res.status(400).json({ success: false, error: result.error });
    }
    catch (error) {
        console.error('Errore durante la registrazione:', error);
        return res.status(500).json({ error: 'Errore del server' });
    }
});
router.get('/getidbyemail', async (req, res) => {
    const { email } = req.query;
    if (!email)
        return res.status(400).json({ success: false, error: 'Email required' });
    try {
        const student = await studentModel_1.default.findOne({ email: email.toLowerCase() });
        if (student)
            return res.json({ success: true, id: student.username });
        return res.status(404).json({ success: false, error: 'Not found' });
    }
    catch {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
