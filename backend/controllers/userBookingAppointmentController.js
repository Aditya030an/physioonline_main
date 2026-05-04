import express from "express";
import userBookingAppointmentModel from "../models/userBookingAppointmentModels.js";
import validator from "validator";

const createUserBookingAppointment = async (req , res)=>{
    try{
        const { category , date , time , city , bookingType } = req.body;
        console.log("req.body" , req.body);
       
        const { userId } = req.body;
        if(bookingType === "online"){
            if(!category || !date || !time){
                return res.json({success:false ,  message: "Please fill all the fields" });
            }
        }
        if(bookingType === "offline" &&  !city){
            return res.json({success:false ,  message: "Please select the city" });
        }
        const newUserBookingAppointment = new userBookingAppointmentModel({
            category,
            date,
            time,
            userId,
            bookingType,
            city,
        });
        await newUserBookingAppointment.save();
        res.status(200).json({success:true ,  message: "User booking appointment created successfully" });
    }catch(error){
        console.log(error);
        res.json({ message: error.message });
    }
}

const getUserBookingAppointment = async (req , res)=>{
    try{
        const { userId } = req.body;
        const userBookingAppointment = await userBookingAppointmentModel.find({ userId });
        res.status(200).json({success:true ,  message: "User booking appointment fetched successfully" , data: userBookingAppointment });
    }catch(error){
        console.log(error);
        res.json({ message: error.message });
    }
}

export { createUserBookingAppointment , getUserBookingAppointment };