import { UserModel } from "../models/userModel";

export async function list(req: any, res: any, next: any) {

    try{
        console.log('check admincontroller',req.user)
        const chkUser = await UserModel.find({})
        .select('-password')
        .exec()
        res.send(chkUser)
    }catch(err) {
        console.log(err);
        res.status(500).send('server error')
    }
}
export async function changerole(req: any, res: any, next: any) {

    try{
        console.log('changerole admincontroller',req.body)
        const {id, role} = req.body.data;
        // console.log('id and role from admincontroller',id , role)
        const changerole = await UserModel.findOneAndUpdate({_id:id},{role:role},{new:true})
        .select('-password')
        .exec();
        res.send(changerole)
    }catch(err) {
        console.log(err);
        res.status(500).send('server error')
    }
}
