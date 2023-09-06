const express = require('express');
const router = express.Router();

router.get('/planes', (req, res) => {
  res.json('yes');
});

module.exports = router; 
