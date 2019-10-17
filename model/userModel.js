const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    userId:String,
    userName:String,
    password:String,
    email:String,
    roleId:String,
    createdBy:{
        type:String,
        enum:['administrator','operator','accessuser'],
        trim:true,
        default:'accessUser'
    },
    isAprrove:{
        type:Boolean,
        default:false
    },
    date:{type:Date,default:Date.now}
});

const userInfo=mongoose.model('users',userSchema);

module.exports.userSchema=userSchema;
module.exports.userInfo=userInfo;