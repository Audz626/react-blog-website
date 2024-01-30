import jwt from 'jsonwebtoken'
import {UserModel} from '../models/userModel'

export async function auth(req:any, res:any, next:any) {
    try{
        // const token = req.headers['authtoken'];
        // console.log('@ header in auth middleware',req.headers.authentication)

        const token = req.headers.authentication.split(" ")[1]
        ? req.headers.authentication.split(" ")[1]
        : req.headers.authentication ; // remove "bearer" in token
        
        console.log('auth middleware',token);
        if(!token){
            return res.status(401).send('Token Unavailable!!');
        }
        // check token already used or not
        const decoded:any = jwt.verify(token,'jwtsecret') // object
        // console.log('req.headers>>>',req.headers);
        req.user = decoded.user;  // object
        console.log('req.user auth Mid :',req.user); 

        next();
    }catch(err){
        console.log(err)
        res.status(500).send('Token Invalid!!'); // invalid token or expire
    }
}

export async function admincheck(req:any, res:any, next:any) {
    try{
        console.log(req.user.name)
        const chkuser = await UserModel.findOne({name:req.user.name})
        .select('-password')
        .exec()
        console.log('chkuser',chkuser)

        if(chkuser?.role !== 'admin'){
            res.status(403).send('Admin Access Denied!!')
        }else{
            next();
        }

    }catch(err){
        console.log(err);
        res.status(403).send('Admin Access Denied!!');
    }
}