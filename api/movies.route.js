// routes/movies.js
import express from "express";
import MoviesDAO from "../dao/moviesDAO.js";
import ReviewsDAO from "../dao/reviewsDAO.js";

const router = express.Router();

/**
 * GET /api/v1/movies
 * Optional query parameters:
 *  - title: string
 *  - rated: string
 */
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if (req.query.title) filters.title = req.query.title;
    if (req.query.rated) filters.rated = req.query.rated;

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ filters });
    res.json({ movies: moviesList, total: totalNumMovies });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/v1/movies/ratings
 */
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await MoviesDAO.getRatings();
    res.json(ratings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/v1/movies/:id
 * Returns movie by ID including reviews
 */
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MoviesDAO.getMovieById(movieId);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * DELETE /api/v1/movies/:id/reviews
 * Deletes a review by review_id and user_id
 * Body: { review_id, user_id }
 */
router.delete("/:id/reviews", async (req, res) => {
  try {
    const movieId = req.params.id;
    const { review_id, user_id } = req.body;

    if (!review_id || !user_id)
      return res.status(400).json({ error: "Review ID and User ID are required" });

    const result = await ReviewsDAO.deleteReview(review_id, user_id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Review not found or not authorized" });
    }

    // Optionally return the updated movie
    const movie = await MoviesDAO.getMovieById(movieId);
    res.json({ status: "success", movie });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;