// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({
//     path:".env"
// })
// console.log("mongoDb" , process.env.MONGO_URI);

// const databaseConnection = ()=>{
//     mongoose.connect(process.env.MONGO_URI).then(()=>{
//         console.log("MongoDb connect successfully");
//     }).catch((error)=>{
//         console.log(error);
//     })
// };

// export default databaseConnection;


import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    console.log("mongo db" , process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default databaseConnection;