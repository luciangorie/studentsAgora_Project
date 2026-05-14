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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StudentService = __importStar(require("../services/studentService"));
const PersonalDetailsService = __importStar(require("../services/detailsService"));
const router = (0, express_1.Router)();
router.get('/getfrom/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const studentData = await StudentService.getByUsername(username);
        if (studentData) {
            return res.status(200).json({ success: true, data: studentData });
        }
        return res.status(404).json({ success: false, error: 'Student not found' });
    }
    catch (error) {
        console.error('Error fetching student data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.get('/details/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const detailsData = await PersonalDetailsService.getPersonalDetailsByusername(username);
        if (detailsData) {
            return res.status(200).json({ success: true, data: detailsData });
        }
        return res.status(404).json({ success: false, error: 'Personal details not found' });
    }
    catch (error) {
        console.error('Error fetching personal details:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.post('/details/event/:addEvent', async (req, res) => {
    const addEvent = req.params.addEvent;
    const { username } = req.body;
    try {
        const detailsData = await PersonalDetailsService.getPersonalDetailsByusername(username);
        if (detailsData) {
            detailsData.eventsParticipated.push(addEvent);
            await detailsData.save();
            return res.status(200).json({ success: true, message: 'Event added successfully' });
        }
        return res.status(404).json({ success: false, error: 'Personal details not found' });
    }
    catch (error) {
        console.error('Error adding event to personal details:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
