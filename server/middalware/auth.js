import jwt from "jsonwebtoken"
import config from 'config'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    try{
    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided' });
    }
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
        console.log(authHeader , "jwt")
        req.user = decoded;
        next();
      });
    } else {
      res.status(403).json({ error: 'Invalid token' });
    }
    }catch(error){
        res.status(403).json({ success:false , error:error.message });
    }
  };

  export default verifyToken