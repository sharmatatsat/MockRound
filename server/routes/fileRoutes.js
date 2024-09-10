const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Route 
router.post('/upload', upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'entranceExamMarksheet', maxCount: 1 }
]), (req, res) => {
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
});

// Route to serve files
router.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(filePath);
});

module.exports = router;
