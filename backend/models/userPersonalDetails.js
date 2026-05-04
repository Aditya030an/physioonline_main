import mongoose from "mongoose";

const userPersonalDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,    
    },
    hobbies: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },          
    });

const userPersonalDetails = mongoose.model("userPersonalDetails", userPersonalDetailsSchema);
export default userPersonalDetails;