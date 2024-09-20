const { User } = require('../models')
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')


function isStringInvalid(string){
    if(string===undefined || string.length===0){
        return true
    }
    else{
        return false
    }
}


exports.Register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({error:"something is missing"})
        }
        // Check if the user with the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const saltRounds=10
        const hash = await bcrypt.hash(password, saltRounds);

         await User.create({name,email,password:hash})
                res.status(200).json("record inserted correctly")


    }catch(err){
        res.status(404).json({error:err })

    }
   
}



exports.logIn = async (req, res) => {
    try {
        const{useremail,userpassword}  = req.body

        if(isStringInvalid(useremail) || isStringInvalid(userpassword) ){
            return res.status(400).json({error:"something is missing"})
        }

        const user = await User.findOne({ where: { email: useremail } });
        // console.log("user",user)

        if (user) {
            const passwordMatch = await bcrypt.compare(userpassword, user.password);
            if (passwordMatch) {
                res.status(200).json({ message: "User logged in successfully",
                    token:generateAccessToken(user.id,user.name,user.email)
                });
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

function generateAccessToken(id,username,email){
    return jwt.sign({userid:id,username:username,useremail:email},'a1aa9904fd5e3367d2e6bb6e63d31416e2b214fcb0bbafadd3bcc9ed524bb22fbdf6948669b7a29b79b77ed24db4e3fc5e3ea39af09e021de696c6dfdeac0ac8', { expiresIn: '1h' });
};
