const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const PostService = require('../services/postService.cjs');

// Configurazione multer: salva i file nella cartella uploads/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, unique + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
    fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (file.mimetype.startsWith('image/') && allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Solo immagini consentite (jpg, png, gif, webp)'));
        }
    }
});

// Upload immagine → restituisce l'URL locale
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Nessun file caricato' });
    }
    res.status(200).json({ success: true, url: '/uploads/' + req.file.filename });
});

// Gestione errori multer (file troppo grande, tipo non valido)
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message) {
        return res.status(400).json({ success: false, error: err.message });
    }
    next(err);
});

router.post('/create', async (req, res) => {
    const postData = req.body;
    const result = await PostService.createPost(postData);
    if (result.success) {
        res.status(201).json({ success: true, data: result.data });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

router.get('/allposts', async (req, res) => {
    try {
        const posts = await PostService.getAllPosts();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch posts' });
    }
});

module.exports = router;