import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:["todo", "inprogress","done"],
        default:"todo"
    },
    priority:{
        type:String,
        enum:["high","medium","low"],
        default:"medium" 
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required:true
    },
    dueDate:Date,
    attachment:String
},
{
    timestamps:true
})
export default mongoose.model("Task",taskSchema);