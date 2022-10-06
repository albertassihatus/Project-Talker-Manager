const express = require('express');

const { readTalkerData, writeNewTalkerData } = require('../utils/fsUtils');

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
        const talker = req.body;

        const talkers = await readTalkerData();
        
        const newTalkersWithId = { id: talkers.length + 1, ...talker };

        talkers.push(newTalkersWithId);

        await writeNewTalkerData(talkers);

        // await fs.writeFile(talkerPath, JSON.stringify(talkers));

        res.status(201).json(newTalkersWithId);
},
);

module.exports = router;
