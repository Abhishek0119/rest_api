const User = require('../database/models/user');

module.exports =(req,res) =>{
    const Email = req.body.Email;
  //  console.log(Email);
     User.findOne({Email:Email},(err,user)=>{
         if(err || !user)
              return res.status(201).json({message:"No such user exist."});
         else if(user)
             {
                /* console.log(user);
                 console.log(user._id);*/
                 res.status(200).json(user._id);
                 
             }
     })
}
   