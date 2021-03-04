const User = require('../database/models/user');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const {logger} = require('../logger');
module.exports = (req,res)=>{
     const _id = req.params.id;
       const input = req.body;
       logger.info(input);
       const encryptedString = cryptr.encrypt(input.Password);
       User.updateOne({ _id: _id },{
        Name : input.Name,
        Email:input.Email,
        Address:input.Address,
        Phone_number:input.Phone_number,
        Password:encryptedString
       } ,(err,result)=>{
              if(err)
              {
                  logger.error('ERROR'+err);
                  res.status(500);
              }
              else if(result)
              {
                  logger.info("The user details is successfully updated"+input);
                  res.status(200).json({message:"The user details are successfully updated"});
              }
       }
      );
}