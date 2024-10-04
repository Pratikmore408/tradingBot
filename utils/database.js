import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ");
  } catch (error) {
    // If there is an error while connecting, log the error message
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Exporting the function
export default connectDB;
