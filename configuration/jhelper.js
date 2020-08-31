const jwt= require('jsonwebtoken');

module.exports.verifyJwtToken = (req,res,next)=>{
    var token;
    if('authorization' in req.headers)
    token=req.headers['authorization'].split(' ')[1];
    if(!token){
    return res.status(403).send({ auth: false, message:"No token"})
    // console.log(err)
    }
    else{
        jwt.verify(token,process.env.JWT_SECRET,
        (err,decoded) => {
            if(err)
            return res.status(500).send({ auth:false, message:'token authentication failed'});
            else{
                req._id=decoded._id;
            next()  ;          }
        }



            )
    }
}
// module.exports = {
//     ensureAuth: function (req, res, next) {
//       if (req.isAuthenticated()) {
//         return next()
//       } else {
//         res.redirect('/')
//       }
//     }
// }

module.exports.ensureAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    else{
        console.log("Invalid token")
        return res.send("Invalid accesss")
    }
    }

