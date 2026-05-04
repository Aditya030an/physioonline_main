import mongoose from "mongoose";

const userBookingAppointmentSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    city:{
        type:String,
    },
    bookingType:{
        type:String,
    },
} , {minimize:false}) ;

const userBookingAppointmentModel = mongoose.model("userBookingAppointment" , userBookingAppointmentSchema);

export default userBookingAppointmentModel;

