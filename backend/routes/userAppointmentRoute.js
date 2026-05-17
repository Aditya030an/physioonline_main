import express from "express";
import authUser from "../middleware/auth.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

import {
  createUserBookingAppointment,
  getUserBookingAppointment,
} from "../controllers/userBookingAppointmentController.js";

const userAppointmentRouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const convertTo24Hour = (time) => {
  const [rawTime, modifier] = time.split(" ");
  let [hours, minutes] = rawTime.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12);
  }

  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
};

userAppointmentRouter.post(
  "/createAppointment",
  authUser,
  createUserBookingAppointment,
);

userAppointmentRouter.get(
  "/getUserBookingAppointment",
  authUser,
  getUserBookingAppointment,
);

userAppointmentRouter.post("/book", async (req, res) => {
  try {
    const data = req.body;
    console.log("data", req.data);
    if (data.visitType === "Follow-up") {
      if (!data.patientName || !data.mobile) {
        return res.status(400).json({
          success: false,
          message: "Patient name, mobile number are required",
        });
      }
    } else {
      if (!data.patientName || !data.mobile || !data.complaint) {
        return res.status(400).json({
          success: false,
          message: "Patient name, mobile number and complaint are required",
        });
      }
    }

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid 10 digit mobile number",
      });
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid email",
      });
    }

    if (data.mode === "Home Visit") {
      if (!data.address || !data.city || !data.landmark) {
        return res.status(400).json({
          success: false,
          message: "Address, city and landmark are required for home visit",
        });
      }
    }

    if (!data.appointmentDate || !data.mode || !data.timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Appointment date, mode and time slot are required",
      });
    }

    const attendees = [{ email: process.env.OWNER_EMAIL }];

    if (data.email && data.email.trim()) {
      attendees.push({ email: data.email.trim() });
    }

    const time24 = convertTo24Hour(data.timeSlot);

    const startDateTime = new Date(
      `${data.appointmentDate}T${time24}:00+05:30`,
    );

    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const event = {
      summary: `Physiotherapy Appointment - ${data.patientName}`,
      description: `
Patient Name: ${data.patientName}
Age: ${data.age || "Not provided"}
Gender: ${data.gender || "Not provided"}
Mobile: ${data.mobile}
Email: ${data.email || "Not provided"}

Mode: ${data.mode}
Visit Type: ${data.visitType || "Not provided"}
Complaint: ${data.complaint}
Duration: ${data.duration || "Not provided"}
Diagnosis: ${data.diagnosis || "Not provided"}
Pain Level: ${data.painLevel || "Not provided"}

Address: ${data.address || ""}
City: ${data.city || ""}
Landmark: ${data.landmark || ""}
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const existingEvents = await calendar.events.list({
      calendarId: "primary",
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    if (existingEvents.data.items.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked. Please select another slot.",
      });
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    const calendarLink = response.data.htmlLink;

    const emailResp = await transporter.sendMail({
      from: `"Movement Rehab Appointment" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Appointment Booked - ${data.patientName}`,
      html: `
        <h2>New Appointment Booked</h2>

        <p><strong>${data.patientName}</strong> has booked an appointment.</p>

        <h3>Patient Details</h3>
        <p><strong>Name:</strong> ${data.patientName}</p>
        <p><strong>Age:</strong> ${data.age || "Not provided"}</p>
        <p><strong>Gender:</strong> ${data.gender || "Not provided"}</p>
        <p><strong>Mobile:</strong> ${data.mobile}</p>
        <p><strong>Email:</strong> ${data.email || "Not provided"}</p>

        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${data.appointmentDate}</p>
        <p><strong>Time Slot:</strong> ${data.timeSlot}</p>
        <p><strong>Mode:</strong> ${data.mode}</p>
        <p><strong>Visit Type:</strong> ${data.visitType || "Not provided"}</p>

        <h3>Medical Details</h3>
        <p><strong>Complaint:</strong> ${data.complaint}</p>
        <p><strong>Duration:</strong> ${data.duration || "Not provided"}</p>
        <p><strong>Diagnosis:</strong> ${data.diagnosis || "Not provided"}</p>
        <p><strong>Pain Level:</strong> ${data.painLevel || "Not provided"}</p>

        <h3>Address Details</h3>
        <p><strong>Address:</strong> ${data.address || "Not provided"}</p>
        <p><strong>City:</strong> ${data.city || "Not provided"}</p>
        <p><strong>Landmark:</strong> ${data.landmark || "Not provided"}</p>

        <br />

        <p>
          <a href="${calendarLink}" target="_blank">
            View Appointment in Google Calendar
          </a>
        </p>
      `,
    });

    console.log("email resp", emailResp);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      calendarLink,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
});

userAppointmentRouter.get("/booked-slots", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const startOfDay = new Date(`${date}T00:00:00+05:30`);
    const endOfDay = new Date(`${date}T23:59:59+05:30`);

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const bookedSlots = response.data.items.map((event) => {
      const start = new Date(event.start.dateTime);

      return start.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
    });

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    console.error("Booked Slots Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booked slots",
    });
  }
});

export default userAppointmentRouter;
