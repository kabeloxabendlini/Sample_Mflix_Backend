import MoviesDAO from "../dao/MoviesDAO.js";
import ReviewsDAO from "../dao/ReviewsDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    res.json({
      movies: moviesList,
      page,
      filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    });
  }

  static async apiGetMovieById(req, res) {
    try {
      let id = req.params.id;
      let movie = await MoviesDAO.getMovieById(id);
      if (!movie) {
        res.status(404).json({ error: "Movie not found" });
        return;
      }
      res.json(movie);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRatings(req, res) {
    try {
      let ratings = await MoviesDAO.getRatings();
      res.json(ratings);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiPostReview(req, res) {
    try {
      const movieId = req.params.id;
      const review = req.body.review;

      const user = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const response = await ReviewsDAO.addReview(movieId, user, review);
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const userId = req.body.user_id;

      const response = await ReviewsDAO.updateReview(
        reviewId,
        userId,
        review
      );

      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      const response = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}