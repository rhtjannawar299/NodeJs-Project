const express = require('express');

const app = express();

const home = require('./routes/home');

const user = require('./routes/user');

const roles = require('./routes/role');

const person = require('./personinfo/persons');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/assignment')
        .then(()=>console.log('connceted with db...........'))
        .catch(err=>console.error("could not connect db",err));


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use('/',home);

app.use('/role',roles);

app.use('/person',person);

app.use('/user',user);


// server port setting

const port = process.env.Port||3000;

app.listen(port,()=>console.log(`server is lisning on ${port}`));