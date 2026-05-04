import personalDetailsModel from "../models/userPersonalDetails.js";
const createPersonalDetails = async (req , res)=>{
    console.log("req body personal details" , req.body);
    const userId = req.body.userId;

    const {name , email , age , gender , city , profession , hobbies , language , about} = req.body;

    try{
        const newPersonalDetails = new personalDetailsModel({userId ,name , email , age , gender , city , profession , hobbies , language , about});
        await newPersonalDetails.save();
        res.status(200).json({success:true , message:"Personal details created successfully"});
    }catch(error){
        console.log(error);
        res.json({ message: error.message });
    }
}

const getPersonalDetails = async (req , res)=>{
    const userId = req.body.userId;
    try{
        const personalDetails = await personalDetailsModel.findOne({userId});
        res.status(200).json({success:true , personalDetails});
    }catch(error){
        console.log(error);
        res.json({ message: error.message });
    }
}

export { createPersonalDetails , getPersonalDetails };