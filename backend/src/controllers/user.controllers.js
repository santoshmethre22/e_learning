import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/Trycatch.js";

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    // Generate OTP
    const otp = Math.floor(Math.random() * 100000);

    // Generate activation token
    const activationToken = jwt.sign(
      {
        user: newUser,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    // Prepare email data
    const data = {
      name,
      otp,
    };

    // Send OTP to user's email
    await sendMail(email, "E_learning", data);

    res.status(200).json({
      message: "OTP sent to email",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const verifyUser=TryCatch(async(req,res)=>{
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    if (!verify)
        return res.status(400).json({
          message: "Otp Expired",
        });


        if (verify.otp !== otp)
            return res.status(400).json({
              message: "Wrong Otp",
            });


    
        await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.password
        })


        res.json({
            message: "User Registered successfully",
          });

  
});

