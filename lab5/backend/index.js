const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

const users = [];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already existis' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully!' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

router.get('/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ id: user.id, username: user.username });
});

module.exports = router;