import express from 'express';
import {create,read,update,remove,list} from '../controllers/productController'
import {auth} from "../middleware/auth";
import { upload } from '../middleware/upload';

const router = express.Router();

router.get('/product',list)
router.get('/product/:id',read)
router.post('/product',upload,create)
router.put('/product/:id',upload,update)
router.delete('/product/:id',remove)

export default router;