const express = require('express');

const router = express.Router('/api/genres')
router.get('/', (req, res) => {
    res.send('Home')
});

module.exports = router;