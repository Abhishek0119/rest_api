const User = require('../database/models/user');
const {logger}=require('../logger');
module.exports = (req,res) =>{
    if(req.user){
    User.find((error,users)=>{
        if(error)
        {
            logger.error(error);
            res.status(500).json({message:"Problems when reading the information"});
        }else if(users)
        {
        
            logger.info("All users were found");
            res.status(200).json(users);
        }
    })
 }
}