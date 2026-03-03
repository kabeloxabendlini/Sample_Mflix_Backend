import express from "express";
import MoviesDAO from "../dao/moviesDAO.js";
import ReviewsDAO from "../dao/reviewsDAO.js";

const router = express.Router();

/**
 * GET ALL MOVIES
 */
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if (req.query.title) filters.title = req.query.title;
    if (req.query.rated) filters.rated = req.query.rated;

    const { moviesList, totalNumMovies } =
      await MoviesDAO.getMovies({ filters });

    res.json({ movies: moviesList, total: totalNumMovies });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET RATINGS
 */
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await MoviesDAO.getRatings();
    res.json(ratings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET MOVIE BY ID (WITH REVIEWS)
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await MoviesDAO.getMovieById(req.params.id);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * CREATE REVIEW
 */
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user_id, name, text } = req.body;

    if (!user_id || !name || !text) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const review = {
      movie_id: req.params.id,
      user_id,
      name,
      text,
      date: new Date()
    };

    const result = await ReviewsDAO.addReview(review);

    res.json({ status: "success", review_id: result.insertedId });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * UPDATE REVIEW
 */
router.put("/:id/reviews", async (req, res) => {
  try {
    const { review_id, user_id, text } = req.body;

    if (!review_id || !user_id || !text) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await ReviewsDAO.updateReview(
      review_id,
      user_id,
      text,
      new Date()
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Review not found or unauthorized" });
    }

    res.json({ status: "success" });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * DELETE REVIEW
 */
router.delete("/:id/reviews", async (req, res) => {
  try {
    const { review_id, user_id } = req.body;

    if (!review_id || !user_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await ReviewsDAO.deleteReview(review_id, user_id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Review not found or unauthorized" });
    }

    res.json({ status: "success" });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;