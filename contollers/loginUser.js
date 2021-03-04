require('dotenv').config()
const jwt = require('jsonwebtoken');
const {logger} = require('../logger');
let refreshTokens = [];
module.exports = (req,res)=>{
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
 
}
function generateAccessToken(user) {
    return jwt.sign({user},process.env.ACCESS_TOKEN_SECERET,{expiresIn:'2m'});
}