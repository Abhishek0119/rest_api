const User = require('../database/models/user');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const {logger} = require('../logger');
module.exports =  (req,res)=>{
          console.log(req.body);
    //  res.send(req.body);
        const _id = req.params.id;
        const input =req.body;
        const encryptedString = cryptr.encrypt(input.Password);
        User.updateOne({_id: _id},{Password:encryptedString },(err,result)=>{
        if(err)
        {
            logger.error('ERROR'+err);
            res.status(500).json({message:"There is an error."});
        }
        else if(result)
        {   
            logger.info("The user password is successfully updated"+input);
            res.status(200).json({message:"The password is successfully updated."});
        }
    })
}