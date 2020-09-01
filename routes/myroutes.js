//importing packages
const express=require('express')
const mongoose=require('mongoose')
const passport=require('passport')
const router=express.Router()


//just seperating functionality of route to avoid clumsyness
const gotoContol = require('../control/mycontrol');
const jhelper = require('../configuration/jhelper');
const ghelper=require('../configuration/passport-oauth');

//routers
router.post('/signin',gotoContol.postsignin)
router.get('/signin',gotoContol.getsignin)
router.get('/signin/:id',gotoContol.getUser)
router.delete('/signin/:id',gotoContol.delUser)
router.put('/signin/:id',gotoContol.putUser);

router.post('/authenticate',gotoContol.authenticate);
router.get('/userprofile',jhelper.verifyJwtToken,gotoContol.userprofile);

router.get('/google',passport.authenticate('google',{scope:['email','profile']}))

router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/auth/signin'}),
(req,res)=>{
    res.redirect('/auth/authenticate')
})

//routes for pitcher schema

router.post('/addpitch',jhelper.verifyJwtToken,gotoContol.addpitch);
//router.get('/getallpitches',jhelper.verifyJwtToken,gotoContol.getallpitches);
router.get('/getallpitches',ghelper.isAuth,gotoContol.getallpitches);
router.get('/getpitchbyid/:id',ghelper.isAuth,gotoContol.getpitchesById);
//router.get('/getpitchbyid/:id',(jhelper.verifyJwtToken)gotoContol.getpitchesById);
router.delete('/deletepitch/:id',gotoContol.delete);
router.get('/getbyemail',gotoContol.getByEmail);

/*router.get('/google',gotoContol.googleauth);
router.get('/google/callback',gotoContol.sendtopage);*/
//making this available globally
module.exports=router;