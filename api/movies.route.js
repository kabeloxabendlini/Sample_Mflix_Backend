// movies.route.js
import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();
/**
 * Movies routes
 */
router.route("/")
  .get(MoviesController.apiGetMovies);          // GET all movies
router.route("/ratings")
  .get(MoviesController.apiGetRatings); // GET all ratings
router.route("/:id")
  .get(MoviesController.apiGetMovieById);   // GET movie by ID
/**
 * Reviews routes
 */
router.route("/:id/reviews")            // note the :id prefix
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
