import express from 'express';
import {register,login,checkcurrentUser} from '../controllers/authController'
import { auth,admincheck } from '../middleware/auth';

const router = express.Router();
router.post('/register',register)
router.post('/login',login)
router.post('/checkcurrent',auth,checkcurrentUser)
router.post('/checkcurrent-admin',auth,admincheck,checkcurrentUser)

export default router