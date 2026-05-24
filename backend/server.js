import express from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./routes/userRoute.js";
import userAppointmentRouter from "./routes/userAppointmentRoute.js";
import userPersonalDetailsRoute from "./routes/userPersonalDetailsRoute.js";
import blogRouter from "./routes/blog.routes.js";
import databaseConnection from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:5000",
//   "https://movementrehab.in",
//   "https://www.movementrehab.in",
//   "https://physioonline-main.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("Request Origin:", origin);

//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error(`Not allowed by CORS: ${origin}`));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(cors({}))


app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/bookAppointment", userAppointmentRouter);
app.use("/api/userDetails", userPersonalDetailsRoute);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

const startServer = async () => {
  await databaseConnection();

  app.listen(port, () => {
    console.log("server started on PORT:" + port);
  });
};

startServer();