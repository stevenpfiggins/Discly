const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res
      .status(401)
      .json({ msg: 'Authorization denied because no token was found' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;
