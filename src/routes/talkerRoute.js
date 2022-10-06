const express = require('express');

const fs = require('fs').promises;

const { readTalkerData } = require('../utils/fsUtils');

const talkerPath = './src/talker.json';

const { nameValidate,
    authenticate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate } = require('../middlewares/signTalkers');

const router = express.Router();

router.get('/', async (req, res) => {
    const talkerData = await readTalkerData();
    if (!talkerData.length) {
        res.status(200).json([]);
    } else {
        res.status(200).json(talkerData);
    }
});

  router.get('/:id', async (req, res) => {
    const talkerData = await readTalkerData();
    const talkerId = talkerData.find(({ id }) => id === Number(req.params.id));
    if (!talkerId) {
    res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
} else {
    res.status(200).json(talkerId);
}
  });

router.post(
    '/',
    authenticate,
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate,
    async (req, res) => {
        const product = { ...req.body };

        const products = await readTalkerData();
        
        const newTalkersWithId = { id: products.length + 1, ...product };

        products.push(newTalkersWithId);

        await fs.writeFile(talkerPath, JSON.stringify(products));

        res.status(201).json(newTalkersWithId);
},
);

module.exports = router;
