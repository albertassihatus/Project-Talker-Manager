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

        res.status(201).json(newTalkersWithId);
},
);

router.put(('/:id'), 
    authenticate, nameValidate, ageValidate, talkValidate,
    watchedAtValidate,
    rateValidate, 
 async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  const talkers = await readTalkerData();
  const findTalkerId = talkers.findIndex((talker) => talker.id === Number(id));
  const putTalker = {
    id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const newTalkers = [...talkers];
  newTalkers[findTalkerId] = putTalker;
  await writeNewTalkerData(newTalkers);
  res.status(200).json(putTalker);
});

router.delete('/:id', 
    authenticate,
    async (req, res) => {
    const { id } = req.params; 

    const talkers = await readTalkerData();
   
    const findTalkerId = talkers.find((talker) => talker.id !== Number(id));
   
    await writeNewTalkerData(findTalkerId);
    return res.status(204).end();
});

module.exports = router;
