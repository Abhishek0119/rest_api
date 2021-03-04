require('dotenv').config()
const {Router}=require('express');
const createUserController = require('./contollers/storeUser');
const showUserController = require('./contollers/showUser');
const deleteUserController = require('./contollers/deleteUser');
const updateUserController = require('./contollers/updateUser');
const setPasswordController = require('./contollers/setpassword');
const multer = require('multer');
const fs = require('fs');
const forgotpassword = require('./contollers/forgotpassword');
let refreshTokens = [];
const {logger}=require('./logger');
const route = Router();
const jwt = require('jsonwebtoken');
route.get('/',(req,res)=>{
     res.send("This is the homepage");
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir ="./uploads";
        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
      cb(null,dir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  var upload = multer({ storage: storage });
  route.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
     /* const error = new Error('Please upload a file')
      error.httpStatusCode = 400*/
      res.status(400).json({error:"Please upload a file."})
      return next(error)
    }
      res.send(file)
   
  })

route.post('/login',(req,res)=>{
    const email=req.body.Email;
    const password = req.body.Password;
     const user = {
         Email: email,
         Password: password
     }
    const accesstoken = generateAccessToken(user);
    const refreshtoken = jwt.sign(user,process.env.REFRESH_TOKEN_SECERET);
         refreshTokens.push(refreshtoken);
       res.json({
           accesstoken : accesstoken,
           refreshtoken: refreshtoken
       })
    logger.info(req.body);
 
});

route.delete('/logout',(req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.send("Successfully deleted the refresh token and logged out");
    // res.status(204).json({message:"Successfully deleted the refresh token and logged out"});
})
route.put('/updateuser/:id',verifyToken,updateUserController);
route.post('/forgot-password',forgotpassword);
route.put('/setPassword/:id',setPasswordController)
route.get('/showusers',verifyToken,showUserController);
route.delete('/deleteuser/:id',deleteUserController);
route.post('/registration',createUserController);
route.post('/token',(req,res)=>{
    const refreshtoken = req.body.token;
    if(refreshtoken == null)
       return res.status(401).json({message:"refreshtoken is equals to null"});
    if(!refreshTokens.includes(refreshtoken))
        return res.status(403).json({message:"This refreshtoken does not match"});
     jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECERET,(err,user)=>{
          if(err)
            return res.status(403);
       const accesstoken =generateAccessToken({Email:user.Email,Password:user.Password})
           res.json({
               accesstoken: accesstoken
           })
     })
})
route.get('*',(req,res)=>{
    res.send("<h1>ERROR 404 : Page not found</h1>");
})
function verifyToken(req,res,next){
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if(token == null)
        return res.status(401).json({message:"Forbidden"})
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERET,(err,user)=>{
            if(err)
               return res.status(430).json({message:"This token no longer exist."});
            req.user =user;
           // console.log(user);
            next();
        })

    
}
function generateAccessToken(user) {
    return jwt.sign({user},process.env.ACCESS_TOKEN_SECERET,{expiresIn:'4m'});
}
module.exports = route;