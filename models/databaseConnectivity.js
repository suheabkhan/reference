const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology:true ,useNewUrlParser:true},(err) =>{
    if(!err){console.log('connected to the database')}
    else{console.log('error in connection:'+JSON.stringify (err,undefined,2))}
});

require('./basic');
require('./pitcher');