import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"


export const isAuth=async(req,res ,next)=>{

    try {
    
            const token=req.headers.token;

            if(!token){ 
               return res.status(400).json({
                    message:"please login"
                })
            }

                let decodeData;
    try {
        decodeData = jwt.verify(token, process.env.jwt_Src);
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

            req.user=await User.findById(decodeData._id);
            if (!req.user) {
                return res.status(404).json({ message: "User not found" });
            }

        next();
    } catch (error) {
            res.status(404).json({
                message:"first login",
            })
    }

}

export const isAdmin=(req,res,next)=>{
    try {

        if(req.user.role!=="admin"){
            return res.status(403).json({
                message:"you are not the admin"
            })
        }

        next()
        
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}