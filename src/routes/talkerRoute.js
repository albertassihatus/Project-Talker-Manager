const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

router.get('/', async (req, res) => {
    const talkerData = JSON.parse(await fs.readFile(talkerPath, 'utf8'));
    if (!talkerData.length) {
        res.status(200).json([]);
    } else {
        res.status(200).json(talkerData);
    }
});
module.exports = router;