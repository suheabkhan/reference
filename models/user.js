const mongoose=require('mongoose');

const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')


var userSchema = new mongoose.Schema({
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
    },
    verified:{
        type:Boolean,
        default:false
    },
    resetLink:{
        type:String,
        default:''
    }
})

userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function(password){
   return bcrypt.compareSync(password,this.password);
}
userSchema.methods.generatedJwt = function(){
   return jwt.sign({ _id:this._id},
   process.env.JWT_SECRET,
   {
       expiresIn:process.env.JWT_EXP
   })
}

mongoose.model('user',userSchema);