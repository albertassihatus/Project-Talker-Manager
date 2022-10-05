const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

  router.post('/', (_req, res) => {
    try {
      res.status(200).json({ token: generateToken() });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

module.exports = router;

// https://levitrares.com/host-https-qastack.com.br/programming/8855687/secure-random-token-in-node-js