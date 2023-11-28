const express = require('express');
const router = express.Router();

router.post('/upload', async (req, res) => {
    res.send({code:200,url:" http://localhost:8081/uploads/"+req.file.originalname})
})
module.exports = router;
