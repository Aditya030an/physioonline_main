import express from 'express';
import authUser from '../middleware/auth.js';
import { google } from "googleapis";
import { createUserBookingAppointment, getUserBookingAppointment } from '../controllers/userBookingAppointmentController.js';

const userAppointmentRouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
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

// Route to create a new appointment
userAppointmentRouter.post("/createAppointment" ,authUser, createUserBookingAppointment);
userAppointmentRouter.get("/getUserBookingAppointment" , authUser, getUserBookingAppointment);
userAppointmentRouter.post("/book", async (req, res) => {
  try {
    const data = req.body;

    console.log("response data" , data);

    const time24 = convertTo24Hour(data.timeSlot);

    const startDateTime = new Date(`${data.appointmentDate}T${time24}:00+05:30`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    const event = {
      summary: `Physiotherapy Appointment - ${data.patientName}`,
      description: `
Patient Name: ${data.patientName}
Age: ${data.age}
Gender: ${data.gender}
Mobile: ${data.mobile}
Email: ${data.email}

Mode: ${data.mode}
Visit Type: ${data.visitType}
Complaint: ${data.complaint}
Duration: ${data.duration}
Diagnosis: ${data.diagnosis}
Pain Level: ${data.painLevel}

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
      attendees: [
        { email: process.env.OWNER_EMAIL },
        { email: data.email },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    console.log("resp" , response.data.htmlLink)

    res.status(201).json({
      success: true,
      message: "Appointment added to Google Calendar",
      calendarLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Google Calendar Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
});

export default userAppointmentRouter;
