// ออกแบบ โครงสร้างในการจัดเก็บข้อมูล
import mongoose,{Schema} from "mongoose";

 const blogSchema:Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    summary: {
        type: String,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    file:{
        type:String,
        default:''
    },
    slug:{
        type:String,
        lowercase:true,
        unique: true
    },
    
},{timestamps:true});

export const blogsModel = mongoose.model('blogs', blogSchema);
