import {User} from "../models/user.models.js";
import bcrypt from "bcrypt"
import sendMail from "../middleware/sendMail.js"

export const registerUser=async(req,res)=>{

    try {

       const {email,name,password}=req.body;


       const user= await User.findOne({email})
       if(user) {
        return res.status(400).json({
            message:"user already exist"
        })
       }

       const haspassword= await bcrypt.hash(password,10);

       user={
        name,
        email,
        password:haspassword
       }

       const otp=Math.floor(Math.random()*100000)

       const activationToken=jwt.sign({
            user,
            otp
       },process.env.ACTIVATION_SECRET,{
        expireIn:"5m"
       })

       const data={
            name,
            otp
       };

       await sendMail(email,"E_learning",data)

       res.status(200).json({
        message:"otp sent to email",
        activationToken
       })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
}

export default registerUser;