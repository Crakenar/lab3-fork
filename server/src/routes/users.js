// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create(username, password);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ error: 'Invalid username or password' });
  }
  const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
  res.send({ token });
});

module.exports = router;