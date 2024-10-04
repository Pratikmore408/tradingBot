// Importing necessary modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import tradeRoutes from "./routes/tradeRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());

// Middleware to parse JSON bodies in requests
app.use(express.json());

app.use("/api", tradeRoutes);

app.get("/", (req, res) => {
  res.send("welcome to trading bot");
});

const PORT = process.env.PORT || 5000;

// Starting the server and listening on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
