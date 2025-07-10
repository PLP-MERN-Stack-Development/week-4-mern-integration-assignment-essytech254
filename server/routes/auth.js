const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


// Register
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('email').isEmail().withMessage('Email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const existing = await User.findOne({ email: req.body.email });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const user = await User.create(req.body);
      res.status(201).json({
        user: { id: user._id, username: user.username, email: user.email },
        token: generateToken(user),
      });
    } catch (err) {
      next(err);
    }
  }
);

// Login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token: generateToken(user),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
