const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
       return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiRGFnZ2V0dCBEb29mdXMgQmVhdmVyIDkiLCJpYXQiOjE3MDQzODMyMTYsImV4cCI6MTcwNDM4NjgxNn0.aPc2vbjC5mqpA1PxdT2f-dPhmKhPsIQ_bjYxFzyc8NU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiRGFnZ2V0dCBEb29mdXMgQmVhdmVyIDkiLCJpYXQiOjE3MDQzODM0NTgsImV4cCI6MTcwNDQ2OTg1OH0.AA8tU1kqabvey43EYAAeswd861HC_hte3UlZpf9SmAQ