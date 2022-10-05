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

  router.get('/:id', async (req, res) => {
    const talkerData = JSON.parse(await fs.readFile(talkerPath, 'utf8'));
    const talkerId = talkerData.find(({ id }) => id === Number(req.params.id));
    if (!talkerId) {
    res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
} else {
    res.status(200).json(talkerId);
}
  });

module.exports = router;
