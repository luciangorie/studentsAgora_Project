const express = require('express');
const router = express.Router();
const path = require('path');
const Student = require('../classes/Student.cjs');
const StudentService = require('../services/studentService.cjs');
const PersonalDetailsService = require('../services/detailsService.cjs');

router.get('/getfrom/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const studentData = await StudentService.getByUsername(username);
        if (studentData) {
            res.status(200).json({ success: true, data: studentData });
        } else {
            res.status(404).json({ success: false, error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.get('/details/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const detailsData = await PersonalDetailsService.getPersonalDetailsByusername(username);
        if (detailsData) {
            res.status(200).json({ success: true, data: detailsData });
        } else {
            res.status(404).json({ success: false, error: 'Personal details not found' });
        }
    } catch (error) {
        console.error('Error fetching personal details:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.post('/details/event/:addEvent', async (req, res) => {
    const { addEvent } = req.params;
    const { username } = req.body;
    try {
        const detailsData = await PersonalDetailsService.getPersonalDetailsByusername(username);
        if (detailsData) {
            detailsData.eventsParticipated.push(addEvent);
            await detailsData.save();
            res.status(200).json({ success: true, message: 'Event added successfully' });
        }
        else {
            res.status(404).json({ success: false, error: 'Personal details not found' });
        }
    } catch (error) {
        console.error('Error adding event to personal details:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});




module.exports = router;