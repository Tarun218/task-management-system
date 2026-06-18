import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    dueDate: Date
},
{
    timestamps: true
});

export default mongoose.model("Board", boardSchema);