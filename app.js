//importing local files

require('./configuration/conn')
require('./models/databaseConnectivity')
require('./configuration/passportconfiguration')
require('./configuration/passport-oauth')
const rts=require('./routes/myroutes')
//const auth=require('./routes/auth')

//importing packages

const express= require('express');
const bodyParser=require('body-parser');
const cors= require('cors');
const passport =require('passport');
const session=require('express-session')
const dotenv=require('dotenv');
const path = require('path');
const mongoose=require('mongoose')
const MongoStore = require('connect-mongo')(session)
var app=express()

//middle ware

//Since, we need to send data in json format,we are making use of it
app.use(bodyParser.json());
app.use(session({
    secret:'flyweight',
    resave:false,
    saveUninitialized:false,
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

//inorder to separate functionality,using a variable to transfer control to myroutes file basing routes

//app.use('/auth',auth);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',rts);
//const { Store } = require('express-session');
//since our angular app and node js app will be running at two different ports
app.use(cors());

//stating the server
app.listen(process.env.PORT,() => console.log(`server is running at : ${process.env.PORT}`));