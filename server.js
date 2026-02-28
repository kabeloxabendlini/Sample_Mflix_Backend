import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config();

// Validate environment variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;

// Validate MongoDB URI
if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI missing in .env");
  process.exit(1);
}

// Start the server after connecting to MongoDB
async function startServer() {
  try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();