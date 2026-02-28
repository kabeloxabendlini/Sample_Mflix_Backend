import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Env vars
const PORT = process.env.PORT || 5000;
const DB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MOVIEREVIEWS_DB_URI
    : process.env.LOCAL_MONGO_URI || process.env.MOVIEREVIEWS_DB_URI;

// Safety check
if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing in .env");
  process.exit(1);
}

// Connect MongoDB
async function startServer() {
  try {
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();

export default app;