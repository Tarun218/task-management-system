import User from '../models/user.model.js'
const getUser = async(req , res)=>{
    try{
        const {email,name} =req.query
    let users;
    if(email){
        users = await User.find({
            email : {$regex:email, $options:"i"}
        }).select("id name email")
    }
    else if(name){
        users = await User.find({
            name : {$regex:name, $options:"i"}
        }).select("id name email")
    }
    else{
        return res.status(400).json({
            message:"Provide name or email"
        })
    }
    res.status(200).json({
        users
    })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
export default getUser