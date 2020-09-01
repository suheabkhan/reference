//importing packages
var objectid = require('mongoose').Types.ObjectId;
const mongoose=require('mongoose')
const passport = require('passport')
const _ =require('lodash');
const { send } = require('process');
const User=mongoose.model('user')
const Pitcher=mongoose.model('pitcher')


//endpoint logic to post the data of user
module.exports.postsignin=(req,res,next)=>{
    console.log("inside post sign-in method")
    var user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err,doc)=>{
    if(!err)
    res.send(doc)
    else{
        if(err.code == 11000 )
            res.status(422).send[('email already exists')];
            else
            return next(err)
    }
    })
}

//endpoint logic to get the data of all users
module.exports.getsignin=(req,res,next)=>{
    console.log("inside getsignin method")
    User.find((err,users)=>{
        if(err)
        res.send(err)
        else
        res.json(users)
    })
}

//endpoint logic to get the particular user
module.exports.getUser=(req,res)=>{
    console.log("inside getUser method")
    User.findById(req.params.id,(err,users)=>{
     if(err)
     res.send(err)
     else
     res.json(users)
    })
}

//endpoint logic to delete particular user
module.exports.delUser=(req,res,next)=>{
    console.log("inside delete user method")
    User.findByIdAndDelete(req.params.id,(err,users)=>{
        if(!err)
        res.json(users)
        else
        console.log('Error in users delete: '+JSON.stringify(err,undefined,2));
    })
}

//endpoint logic to update particular user
module.exports.putUser=(req,res)=>{
    console.log("inside putuser method")
   var user={
    name : req.body.name,
    mobile : req.body.mobile,
    address : req.body.address
    }
    User.findByIdAndUpdate(req.params.id,{$set:user},{new:true},(err,doc)=>{
     if(!err)
     res.send(doc)
     else
     console.log("error in update")
    })
}
module.exports.authenticate = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)
        return res.status(400).json(err)
        else if(user)
        return res.status(200).json({"token":user.generatedJwt()})
        else 
        return res.status(404).json(info);
    })(req,res);
}
module.exports.userprofile =(req,res,next)=>{
    User.findOne({ _id: req._id},
    (err,user)=>{
        if(!user)
        {
        return res.status(404).json({status: false,message:'user details not found'});
        alert(err)
        }
        else{
      return res.status(200).json({status: true,user:_.pick(user,['name','email'])})
       //return res.status(200).json({status: true,message:'user details are these'});
       console.log(err)
        }
    });
}

// module.exports.googleauth=(req,res)=>{
//     console.log("1")
//     passport.authenticate('google',{scope:['email','profile','https://mail.google.com/']})
//     console.log("2")
//     console.log(req)
// }

// module.exports.sendtopage=(req,res)=>{
//     console.log("Hi")
//     passport.authenticate('google',{failureRedirect:'/auth/signin'}),
// (req,res)=>{
//     res.redirect('/auth/authenticate')
// }
// }

module.exports.addpitch=(req,res)=>{
    console.log("inside addpitch method")
 var pitch=new Pitcher();
pitch.Email=req.body.Email;
pitch.Document_name=req.body.Document_name;
pitch.Company_name=req.body.Company_name;
pitch.Company_logo=req.body.Company_logo;
pitch.Company_tagline=req.body.Company_tagline;
pitch.Sector_type=req.body.Sector_type;
pitch.Funding_need=req.body.Funding_need;
pitch.Runway=req.body.Runway;
pitch.Sections=req.body.Sections;
pitch.Team_images=req.body.Team_images;
pitch.Team_details=req.body.Team_details;
pitch.save((err,doc)=>{
    if(!err)
    res.send(doc)
    else
    res.send(doc)
})
}

module.exports.getallpitches=(req,res)=>{
    console.log("Inside getallpitches")
    Pitcher.find((err,pitchers)=>{
        if(err)
        res.send(err)
        else
        res.json(pitchers)
    })
}

module.exports.getpitchesById=(req,res)=>{
    console.log("Inside getpitchesbyid")
    Pitcher.findById(req.params.id,(err,pitchers)=>{
        if(err)
        res.send(err)
        else
        res.json(pitchers)
    })
}

module.exports.delete=(req,res)=>{
    console.log("inside delete pitch method")
    Pitcher.findByIdAndDelete(req.params.id,(err,pitchers)=>{
        if(err)
        res.send(err)
        else{
            res.json(pitchers)
            return res.status(200).json({status: true,message:'Deleted successfully'});
        }
    })
}
module.exports.getByEmail=(req,res)=>{
    console.log("Inside the getbyemail method")
    Pitcher.find({Email:req.body.Email},(err,pitchers)=>{
        if(err)
        res.send(err)
        else
        res.json(pitchers)
    })
}