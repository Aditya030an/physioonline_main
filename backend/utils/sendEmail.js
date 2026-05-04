import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export default async function sendEmail(to, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"OTP Auth" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`
    });
}
