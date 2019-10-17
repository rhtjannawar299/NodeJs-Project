let express=require('express');

let mongoose=require('mongoose');

let personsearch=require('./search');

let personRouter=express.Router();

let {personDetails,personSchema}=require('../model/personModel')

personRouter.get('/',(req,res)=>{
    res.send("hello you are in person page");
});

personRouter.post('/addperson',(req,res)=>{
    console.log(req.body.uuid+'id...');
    let personObj=new personDetails({
        uuId:req.body.uuid,// uuid is user userId and need both equal for realtions
        fName:req.body.fName,
        mName:req.body.mName,
        lName:req.body.lName,
        age:parseInt(req.body.age),
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pincode:parseInt(req.body.pincode),
        mobileNo:parseInt(req.body.mobileNo),
        maritialStatus :req.body.maritialStatus,
        physicalDisablity:req.body.physicalDisablity
    });
    personObj.save();
    res.send('done');
});

personRouter.put('/updatePerson',(req,res)=>{
    console.log("id is *** ",req.body.uuId);
    personDetails.findById(req.body.uuId).then(personDetails => {console.log(personDetails);
      personDetails.set({
        fName:req.body.fName,
        mName:req.body.mName,
        lName:req.body.lName,
        age:parseInt(req.body.age),
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pincode:parseInt(req.body.pincode),
        mobileNo:parseInt(req.body.mobileNo),
        maritialStatus :req.body.maritialStatus,
        physicalDisablity:req.body.physicalDisablity
     });
     personDetails.save();
     console.log(personDetails);
     res.send(personDetails);
 }).catch(err => res.status(404).send('given id is Invalid'));
});

personRouter.delete('/:id',(req,res)=>{
    console.log("id is *** ",req.params.id);
    personDetails.findById(req.params.id).then(personDetails => {console.log(personDetails);
    personDetails.delete();
    console.log('deleted the person');
    res.send('deleted the person');
   }).catch(err => res.status(404).send('given id is Invalid'));
});

personRouter.get('/allPersons',(req,res)=>{
    personDetails.find().then(personDetails => {console.log(personDetails);
        res.send(personDetails);
       }).catch(err => res.status(404).send('Their is no Persons'));
});


personRouter.get('/singelUser/:id',(req,res)=>{
    console.log("id is *** ",req.params.id);
    personDetails.findById(req.params.id).then(personDetails => {res.send(personDetails);
   }).catch(err => res.status(404).send('given id is Invalid'));
});

personRouter.put('/search',(req,res)=>{
     
    if(req.body.age!='' && req.body.city!='' && req.body.fName!=''){
        personDetails.find({age:parseInt(req.body.age)})
        .and({city:req.body.city},{fName:req.body.fName})
        .then(personDetails => {console.log(personDetails);
         res.send(personDetails);
     });
    }else if(req.body.city!=''){
        console.log('city');
        personDetails.find({city:req.body.city})
        .then(personDetails => {console.log(personDetails);
         res.send(personDetails);
     });
    }else if(req.body.fName!=''){
        console.log('name');
        personDetails.find({fName:req.body.fName})
        .then(personDetails => {console.log(personDetails);
         res.send(personDetails);
     });
    }else if(req.body.age!=''){
        console.log('age');
        personDetails.find({age:parseInt(req.body.age)})
        .then(personDetails => {console.log(personDetails);
         res.send(personDetails);
     });
    }else{
        res.status(404).send('No Data Found')
    }
});


module.exports=personRouter;