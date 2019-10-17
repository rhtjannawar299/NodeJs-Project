const express=require('express');

const mongoose=require('mongoose');

const user=express.Router();

var approveStatus=false;

var msg="and need to Approve user";

let {userSchema,userInfo}=require('../model/userModel')

user.get('/',(req,res)=>{
    res.send("hello you are in User page");
});

user.post('/addUser',(req,res)=>{
    console.log((req.body.createdBy));
    if((req.body.createdBy).toLowerCase()==='administrator' ||(req.body.createdBy).toLowerCase()==='operator'){
            try{
                if((req.body.createdBy).toLowerCase()==='administrator'){
                    approveStatus=true;
                    msg='.';
                }

                let userObj=new userInfo({
                    userId:req.body.userId,
                    userName:req.body.userName,
                    password:req.body.password,
                    email:req.body.email,
                    roleId:req.body.roleId,
                    createdBy:(req.body.createdBy).toLowerCase(),
                    isAprrove:approveStatus
                });
        userObj.save();
        res.send('User Created Successfully '+msg);
        }
        catch(err){
            res.send(err.message);
        }
    }else{
        res.status(404).send("not valid user to create the User");
    }    
});

user.put('/updateUser',(req,res)=>{
    console.log("id is *** ",req.body.userId);
    userInfo.findById(req.body.userId).then(userInfo => {console.log(userInfo);
        userInfo.set({
            userName:req.body.userName,
            password:req.body.password,
            email:req.body.email,
            roleId:req.body.roleId
     });
     userInfo.save();
     console.log(userInfo);
     res.send(userInfo);
 }).catch(err => res.status(404).send('given id is Invalid'));
});

user.delete('/:id',(req,res)=>{
    console.log("id is *** ",req.params.id);
    userInfo.findById(req.params.id).then(userInfo => {console.log(userInfo);
    userInfo.delete();
    console.log('deleted the person');
    res.send('deleted the person');
   }).catch(err => res.status(404).send('given id is Invalid'));
});

user.get('/allUsers',(req,res)=>{
    userInfo.find().then(userInfo => {console.log(userInfo);
    res.send(userInfo);
    }).catch(err => res.status(404).send('Their is no Persons'));
});


user.put('/approveUser',(req,res)=>{
    console.log("id is *** ",req.body.userId);
    console.log("role is *** ",req.body.createdBy);
    if((req.body.createdBy).toLowerCase()==='Administrator'.toLowerCase()){
        userInfo.findById(req.body.userId).then(userInfo => {console.log(userInfo);
        userInfo.set({
           isAprrove:req.body.isAprrove
        });
     userInfo.save();
     console.log(userInfo);
     res.send(userInfo);
    }).catch(err => res.send('given id is Invalid'));
    }else{
        res.status(404).send("your are not a valid user to aprrove");
    }
});

module.exports=user;