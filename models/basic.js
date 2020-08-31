const mongoose=require('mongoose');

const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')


var basicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    saltSecret:String,

    googleid:{
        type:String
    }
})

basicSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});

basicSchema.methods.verifyPassword = function(password){
   return bcrypt.compareSync(password,this.password);
}
basicSchema.methods.generatedJwt = function(){
   return jwt.sign({ _id:this._id},
   process.env.JWT_SECRET,
   {
       expiresIn:process.env.JWT_EXP
   })
}

mongoose.model('basic',basicSchema);