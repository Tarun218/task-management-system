    import express from 'express';
    import user from '../models/user.model.js';

    const userRegisterController = async(req,res)=>{
        const {name,email,password} = req.body;
        const userExists = await user.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const user  = await user.create({
            name,email,password
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    export default userRegisterController;