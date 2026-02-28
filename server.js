import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", moviesRouter)
app.use("/api/v1/movies/review", moviesRouter) 

// Express 5–safe 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;

// # "mongodb+srv://kabeloxabendlini385_db_user:Mi09JWwJGvtbkSX7@moviereviews.nwqbw3y.mongodb.net/sample_mflix?appName=movieReviews";
// # {
// #   "compilerOptions": {
// #     "target": "ES2020",
// #     "module": "CommonJS",
// #     "rootDir": "./src",
// #     "outDir": "./dist",
// #     "strict": true,
// #     "esModuleInterop": true,
// #     "moduleResolution": "node",
// #     "types": ["node"]
// #   },
// #   "include": ["**/*.ts"],
// #   "exclude": ["node_modules"]
// # }