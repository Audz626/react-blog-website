import express from 'express';
import { list,create,getblogbyslug, getblogbyid, getblogEditByid, update, remove } from '../controllers/blogController';
import { upload } from '../middleware/upload';


const router = express.Router();

router.get('/getallblog',list);
router.get('/getblog/:slug',getblogbyslug);
router.get('/myblog/:id',getblogbyid);
router.get('/blogedit/:id',getblogEditByid);
router.post('/createblog',upload ,create);
router.put('/editblog/:id',upload,update);
router.delete('/deleteblog/:id',remove);

export default router;