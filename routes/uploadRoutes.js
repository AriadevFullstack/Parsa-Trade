const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); 

router.post('/', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;

