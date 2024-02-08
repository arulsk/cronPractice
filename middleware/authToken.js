const JWT = require('jsonwebtoken');
const { secret_token } = require("../controllers/mainController");

const authenticate_token = (role)=>{
  
return  (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
    JWT.verify(token, secret_token, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      if(user.data.role !== role){
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }
      next();
    });
  
   } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
}
module.exports = authenticate_token;
