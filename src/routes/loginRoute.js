const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const emailValidate = require('../middlewares/emailValidate');
const passwordValidate = require('../middlewares/passwordValidate');

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', emailValidate, passwordValidate, (_req, res) => {
    try {
      res.status(200).json({ token: generateToken() });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;

// https://levitrares.com/host-https-qastack.com.br/programming/8855687/secure-random-token-in-node-js