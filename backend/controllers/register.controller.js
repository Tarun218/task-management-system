    import express from 'express';
    import User from '../models/user.model.js';
    import bcrypt from 'bcryptjs';


    const userRegisterController = async(req,res)=>{
       try{
         const {name,email,password} = req.body;
         if(!name || !email || !password){
            return res.status(400).json({
                message:"Please fill all the fields"
            })
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user  = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
        
       }
       catch(error){
        res.status(500).json({
            message:error.message
        })
       }
    }
    export default userRegisterController;