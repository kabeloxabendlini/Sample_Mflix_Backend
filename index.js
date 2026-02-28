import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import app from "./app.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;

// Safety check for DB URI
if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing in environment variables");
  process.exit(1);
}

async function startServer() {
  try {
    const client = new MongoClient(DB_URI);
    await client.connect();

    console.log("✅ Connected to MongoDB Atlas");

    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

// Start the server
startServer();