import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

const app = express();

// CORS configuration // Allow requests from both local dev and deployed frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://sample-mflix-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// Mount the router
app.use("/api/v1/movies", moviesRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;