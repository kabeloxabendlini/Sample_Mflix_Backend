import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sample-mflix-frontend.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/movies/review", moviesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;