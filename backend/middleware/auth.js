const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const HOD = require('../models/HOD'); // Import HOD model
const Tutor= require ('../models/Tutor') // Import Tutor model

// Middleware to check user authentication
module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging decoded token
    req.user = decoded;
  
    const user = await (decoded.role === 'student' ? Student.findByPk(decoded.id) : 
                         decoded.role === 'teacher' || decoded.role === 'tutor' ? Teacher.findByPk(decoded.id) :
                         HOD.findByPk(decoded.id));
    
    if (!user) {
      return res.status(404).json({ error: `${decoded.role} not found` });
    }
  
    req.user = { ...decoded, email: user.email };
    next();
  } catch (err) {
    console.error('Authentication Error:', err);
    return res.status(401).json({ error: 'Token is not valid' });
  }
  
};
