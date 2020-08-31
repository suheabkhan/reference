const passport=require('passport')
const mongoose=require('mongoose')
const Basic=mongoose.model('basic')
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
          password:profile.name[0],
          googleid:profile.id
      }
    Basic.findOne({ googleid: profile.id },(err,basic)=> {
        if(err)
        return err
        else if(basic)
        return cb(null,basic)
        else{
        basic=Basic.create(newUser)
        return cb(null,basic)
        }
    });
    console.log("data from db")
    console.log(newUser)
    /*const newUser = {
       googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        name:profile.displayName,
        email:profile.emails[0].value,
        googleId:profile.id
      }

      try {
        let basic = await Basic.findOne({ googleId: profile.id })

        if (basic) {
          cb(null, basic)
        } else {
          basic = await Basic.create(newUser)
          cb(null, basic)
        }
      } catch (err) {
        console.error(err)
      }
      console.log("data from db")
    console.log(newUser)*/
  }
));
passport.serializeUser((basic,cb) => {
    cb(null, basic.id)
  }),
  passport.deserializeUser((id, cb) => {
    Basic.findById(id, 
        (err, user) => cb(err, user))
  })