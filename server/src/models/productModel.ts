import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : String,
    detail : {
        type : String,
    },
    price : {
        type : Number
    },
    file : {
        type : String, 
        default:''
    }
},{timestamps : true});

export const ProductModel = mongoose.model('Products', productSchema)