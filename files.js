// routes/files.js
const express = require('express');
const upload = require('../config/multer');
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).json({ filePath: req.file.path });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

module.exports = router;
