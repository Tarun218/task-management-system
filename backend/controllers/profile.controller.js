import express from 'express';
const profile = async(req,res)=>{
    res.json({
        message:"User profile",
        user:req.user
    })
}
export default profile;