// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// یک ادمین فرضی
const adminUser = {
  username: 'admin',
  passwordHash: bcrypt.hashSync('123456', 8), // رمز واقعی = 123456
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username || !bcrypt.compareSync(password, adminUser.passwordHash)) {
    return res.status(401).json({ message: 'نام کاربری یا رمز اشتباه است' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
