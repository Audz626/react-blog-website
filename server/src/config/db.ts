import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_url:any= process.env.PRODUCT_DB? process.env.PRODUCT_DB:'1';
// console.log(db_url);

export const connectDB = async () => {
    try{
        await mongoose.connect(db_url);
        console.log('connected successfully');
    }catch(err){
        console.log(err);
    }
}

