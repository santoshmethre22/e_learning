import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"


export const isAuth=async(req,res ,next)=>{

    try {
    
            const token=req.headers.token;

            if(!token){ 
                res.status(400).json({
                    message:"please login"
                })
            }

            const decodeData=jwt.verify(token,process.env.jwt_Src);

            req.user=await User.findById(decodeData._id);

        next();
    } catch (error) {
            res.status(404).json({
                message:"first login",
            })
    }

}