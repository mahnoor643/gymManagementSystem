const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const router = express.Router();

//create user endpoint
router.post("/signup", async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        //checking if email already exist
        const alreadyExist=await User.findOne({email});
        if(alreadyExist){
            return res.status(409).json({
                message:"User with this email already exists"
            })
        }
        //making random key pwd
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password,salt);
        //Adding data to DB
        const newUser = new User({
            username,email,password: hashedPassword
        });
        const savedUser = await newUser.save();
        //returning success response
        return res.status(201).json(savedUser);
    }catch(error){
        //returning error
        return res.status(500).json({error:error.message});
    }
});


module.exports = router;