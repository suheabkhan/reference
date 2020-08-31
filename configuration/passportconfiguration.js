const passport=require('passport')
const localStrategy=require('passport-local').Strategy

const mongoose=require('mongoose')
var Basic = mongoose.model('basic');

passport.use(
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        Basic.findOne({email : username},
            (err,basic)=>{
                if(err)
                return done (err)
                else if(!basic) 
                return done(null,false, {message: 'Email is not registered'});
                else if(!basic.verifyPassword(password))
                return done(null,false,{message:'Wrong password'});
                else
                return done(null,basic)
            })
    })
)

