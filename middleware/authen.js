const User=require('../models/user')
const jwt=require('jsonwebtoken')
exports.authenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const userPayload= jwt.verify(token,'secretkey');

        const user=await User.findByPk(userPayload.userid)
        req.user=user
        next()
        

    }catch(err){
        res.status(401).json({ error: 'Authentication failed' });

    }

}

