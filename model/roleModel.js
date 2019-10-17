const mongoose=require('mongoose');

const roleSchema=new mongoose.Schema({
    roleName:{
        type:String,
        required:true,
        enum:['Administrator','Operator','AccessUser'],
        trim:true
    },
    date:{type:Date,default:Date.now}
});

const userrole=mongoose.model('roles',roleSchema);

module.exports.roleSchema=roleSchema;
module.exports.userrole=userrole;