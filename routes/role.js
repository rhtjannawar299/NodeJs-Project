const express = require('express');

const mongoose = require('mongoose');

//const auth=require('../authentication/authentication.js');

const role=express.Router();

let {roleSchema,userrole} = require('../model/roleModel')

role.get('/',(req,res)=>{
    res.send("hello you are in role page");
});

/*role.get('/:userId',auth,(req,res)=>{
 res.send("hello you are in role page");
});*/

role.post('/createRole',(req,res)=>{
    let roleName=req.body.roleName;
    createRole(roleName);
    res.send(JSON.stringify(req.body)); 
});

async function createRole(roleName) {
    try{
     let roles=new userrole({
      roleName:roleName
     });
     let result= await roles.save();
      console.log(result);
    }
    catch(error){
      console.log(error.message);
    }
}

role.get('/allRoles',(req,res)=>{
    getAllRole().then(roles=>res.send(JSON.stringify(roles)));
});

async function getAllRole(){
    const userRole=await userrole.find();                         
    console.log(userRole);
    return userRole;
}

module.exports=role;