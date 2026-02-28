import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration to allow requests from frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sample-mflix-frontend.onrender.com"
    ],
    credentials: true
  })
);

// API routes
app.use("/api/v1/movies", moviesRouter);

// Catch-all for unmatched routes
app.use((req, res) => res.status(404).json({ error: "not found" }));

// Export the app for use in server.js
export default app;