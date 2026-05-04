import express from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./routes/userRoute.js";
import userAppointmentRouter from "./routes/userAppointmentRoute.js";
import userPersonalDetailsRoute from "./routes/userPersonalDetailsRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://movementrehab.in",
  "https://www.movementrehab.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/bookAppointment", userAppointmentRouter);
app.use("/api/userDetails", userPersonalDetailsRoute);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log("server started on PORT:" + port);
});