let mongoose=require('mongoose');

let personSchema = new mongoose.Schema({
    uuId:String,
    fName:String,
    mName:String,
    lName:String,
    age:Intl,
    address:String,
    city:String,
    state:String,
    pincode:Number,
    mobileNo:Number,
    maritialStatus :String,
    physicalDisablity:String,
    date:{type:Date,default:Date.now}
});

let personDetails = mongoose.model('persons',personSchema);


module.exports.personSchema=personSchema;
module.exports.personDetails=personDetails;
