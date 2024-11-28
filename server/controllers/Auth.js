const bcrypt=require("bcrypt");
const User = require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existinguser=await User.findOne({email});

        if(existinguser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exist",
            });
        }

        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }

        const user=await User.create({
            email,
            password:hashedpassword
        });

        return res.status(200).json({
            success:true,
            user:user,
            message:"User Created Successfully",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be register , please try again later",
        });
    }
}


exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }

        const payload={
            email:user.email,
            id:user._id,
        }; 

        if(await bcrypt.compare(password,user.password))
        {
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
            
            user.token=token;
            user.password=undefined;
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
            }
            res.cookie("Cookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });
        }
        else
        {
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure",
        });
    }
}