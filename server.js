import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

const app = express();

app.use(express.json());

// CORS must come before routes
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sample-mflix-frontend.onrender.com"
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/movies", moviesRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ error: "not found" }));

export default app;