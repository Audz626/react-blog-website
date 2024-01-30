import {UserModel} from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//http://localhost:2000/api/register
export async function register(req:any,res:any,next:any) {
    try{
        //1.check user
        console.log(req.body)
        const {name, password} = req.body
        var user = await UserModel.findOne({name})
        console.log('Findsameuser',user)

        if(user){
            res.status(400).send('user already exist!!');
            // next();
        }else{
                    //2.encrypt
        const salt = await bcrypt.genSalt(10);

        // get data from default req.body is null (unregister).
        user = new UserModel({
            name,
            password
        })
        // encrypt password by merge password and salt.
        user.password = await bcrypt.hash(password,salt)

        //3.save
        await user.save();
        res.status(200).send('register success!!')
        }
 

    }catch(err:any){
        console.log(err);
        res.send(err).status(500);
    }
}

export async function login(req:any,res:any,next:any) {
    try{
        const {name, password} = req.body;
        console.log('req.body authController:', req.body);
        var user = await UserModel
        .findOneAndUpdate({name},{new:true})
        console.log('data user authcontroller:',user)
        console.log(typeof user?.password)
        console.log(typeof password)

        //1.check user
        if(user && user.password){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).send('password incorrect!!');
            }
        //2.payload

            var payload = {
                user:{
                    id : user._id,
                    name : user.name,
                    role: user.role
                }
            }
        //3.generate token

            jwt.sign(payload, 'jwtsecret', { expiresIn:'1d'}, (err, token) => {
                if(err) throw err;
                res.json({token, payload});
            })

        }else{
            return res.status(400).send('user not found!!')
        }

        // res.send('login')
    }catch(err:any){
        console.log(err);
        res.send(err)
    }
}

export async function checkcurrentUser(req:any, res:any, next:any){
    try{
        console.log('checkcurrentUser controller :',req.user)
        const chkUser = await UserModel.findOne({name: req.user.name})
        .select('-password')
        .exec()
        console.log('chkUser authCon',chkUser);
        res.send(chkUser)
    }catch(err) {
        console.log(err);
        res.status(500).send('server error')
    }
}