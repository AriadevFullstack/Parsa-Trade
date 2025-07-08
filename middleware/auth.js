// server/middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'توکن وجود ندارد' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // optional
    next();
  } catch (err) {
    res.status(401).json({ message: 'توکن نامعتبر است' });
  }
}

module.exports = auth;
