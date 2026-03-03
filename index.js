import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import app from "./app.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

// 
dotenv.config();

//
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;

if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing");
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
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
}

startServer();