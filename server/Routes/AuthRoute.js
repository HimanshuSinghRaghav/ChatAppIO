import express from 'express'
import verifyToken from '../middalware/auth.js';
import registerUser, { loginUser } from '../Controllers/authController.js';

const router = express.Router();


router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;