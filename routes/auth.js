const express=require('express')
const mongoose=require('mongoose')
const passport=require('passport')
const router=express.Router()
const gotoContol = require('../control/mycontrol');

/*router.get('/google',passport.authenticate('google',{scope:['profile']}))

router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/pithcher/signin'}),
(req,res)=>{
    res.redirect('/pitcher/authenticate')
})

//We can save some blank premade sections for each type in a js file in the backend and whenever user creates a new section of a premade type, the blank object from this js file is sent to frontend
/*
[
    {
        sectionType:"Problem Statement",
        inputs:[
            {
            type:"header",
            content["Problem Statement"]
        },
        {
            type:"text",
            content[""]
        }
        ]
    },
    {
        
    },
    ]
     //image, header, subheader, text, highlighted, bold, teamimages, teamnames

     //"Problem Statement","Solution Statement","Target Customers"
*/


router.get('/google',gotoContol.googleauth);
router.get('/google/callback',gotoContol.sendtopage);