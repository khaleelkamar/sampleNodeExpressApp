const jwt = require('jsonwebtoken');

const secret = 'jhjkhjkhiouionmjkoio'; 

function verifyToken(req, res, next) {
    console.log("req.headers[",req.headers)
  const authHeader = req.headers["x-access-token"];;
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authorized',status:401 });
  }

  try {
    const decoded = jwt.verify(authHeader, secret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" ,status:401});
  }
}

module.exports = { verifyToken };
