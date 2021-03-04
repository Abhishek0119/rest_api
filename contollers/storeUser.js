const User = require('../database/models/user');
const {logger} = require('../logger');
module.exports = (req,res)=>{
   User.create(req.body,(error,user)=>{
       if(error)
       {
           logger.error('ERROR' + error);
           res.status(500).json({message:"Problem when saving the information"});
       }else if(user)
       {
           logger.info('The information is saved in the database.');
           res.status(200).json({message:'The user has been created'});
       }
   })
}