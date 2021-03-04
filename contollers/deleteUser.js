const User = require('../database/models/user');
const {logger} = require('../logger');
module.exports = (req,res)=>{
    const _id = req.params.id;
       // console.log(req.body);
       User.deleteOne({ _id: _id }, function (err) {
        if(err) {
           logger.error(err);
        }else if(!err){
             logger.info("The user has been successfully removed");
           res.json({message:"The user has been removed"});
        }
      });
}