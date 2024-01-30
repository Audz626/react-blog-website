import express from "express";
import { list,changerole } from "../controllers/adminController";
import {auth,admincheck} from "../middleware/auth"


const router = express.Router();

router.get('/get-user',auth,admincheck,list);
router.post('/change-role',auth,admincheck,changerole);

export default router;