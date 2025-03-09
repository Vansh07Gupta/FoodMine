import jwt from 'jsonwebtoken';

const authMid = (req, res, next) => {
//   console.log('Auth Middleware Hit'); 

  const authHeader = req.headers.authorization;
//   console.log('🔍 Incoming Auth Header:', authHeader); 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // console.log('🚨 No token found');
    return res.status(401).send('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log('✅ User Authenticated:', decoded); 
    next();
  } catch (error) {
    console.log('🚨 Invalid token:', error.message);
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

export default authMid;
