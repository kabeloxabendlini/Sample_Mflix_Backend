// server.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI || process.env.LOCAL_MONGO_URI;

if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI missing in .env");
  process.exit(1);
}

// ---------------- MongoDB Connection ----------------
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

// Test route to verify backend is live
app.get("/api/test", (req, res) => res.send("Backend is running!"));

startServer();