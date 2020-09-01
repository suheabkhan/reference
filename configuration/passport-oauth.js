const passport=require('passport')
const mongoose=require('mongoose')
const User=mongoose.model('user')
const jhelper = require('../configuration/jhelper');
//const { authenticate } = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
   (accessToken, refreshToken, profile, cb)=> {
    console.log("request from google")
    console.log(profile)

    const newUser={
          name:profile.displayName,
          email:profile.emails[0].value,
          password:profile.name.givenName,
          googleid:profile.id,
          verified:profile.emails[0].verified
      }
    User.findOne({ googleid: profile.id },(err,user)=> {
        if(err)
        return err
        else if(user)
        return cb(null,user)
        else{
        user=User.create(newUser)
        return cb(null,user)
        }
    });
    console.log("data from db")
    console.log(newUser)
  }
));
passport.serializeUser(function(user,cb){
    cb(null,user.id)
  }),
 passport.deserializeUser(function(id, cb){
    User.findById(id, 
        (err,user) => cb(err,user))
  })

// Middleware to check if the user is authenticated
module.exports.isAuth=(req, res, next)=>{
  var googleid = req.body.googleid;
  console.log("Trying to AUTH request",googleid);
  User.find({ accessToken: googleid },(err,user)=>{
      if(user)
        return next();
       else
        {
          if((jhelper.verifyJwtToken))
          return next();
        else
          return res.sendStatus(401);
      }
  })
 }
