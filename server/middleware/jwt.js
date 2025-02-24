import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config'

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET;
    let token = null;
  
    try {
  
        token = jwt.sign(payload, key, { expiresIn: '2h' });
    } catch (err) {
        console.error('Lỗi tạo JWT:', err);
    }
  
    return token;
  };
  
  const verifyToken = (token) => {
    const key = process.env.JWT_SECRET;
    let decoded = null;
    
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.error('Error verifying token:', err);
    }
    
    return decoded;
  };
  
  const authMiddleware = (req, res, next) => {
    const token = req.cookies.admin || req.cookies.staff; 
    console.log('token', token);    
    if (!token) return res.status(401).json({ message: 'Đăng nhập hết hạn' });
  
    try {
        const decoded = verifyToken(token); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
  };
  export default {createJWT, verifyToken, authMiddleware};