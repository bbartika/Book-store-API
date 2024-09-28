const { User }= require('../model');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      
      // Log the header for debugging
      console.log('Authorization Header:', authHeader);
  
      if (!authHeader) {
        return res.status(401).json({ error: 'Authentication token is missing' });
      }
  
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
      }
  
      // Verify the token and log the payload for debugging
      const userPayload = jwt.verify(token, 'a1aa9904fd5e3367d2e6bb6e63d31416e2b214fcb0bbafadd3bcc9ed524bb22fbdf6948669b7a29b79b77ed24db4e3fc5e3ea39af09e021de696c6dfdeac0ac8');
      console.log('User Payload:', userPayload);
  
      const user = await User.findOne({where:{id:userPayload.userid}});
  
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      req.user = user;
      next();
  
    } catch (err) {
      console.error('Error during authentication:', err);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
  







