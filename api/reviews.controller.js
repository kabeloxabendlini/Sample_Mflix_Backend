import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

  // CREATE REVIEW
  static async apiPostReview(req, res) {
    try {
      const { movie_id, review, name, user_id } = req.body;

      const date = new Date();

      await ReviewsDAO.addReview(
        movie_id,
        { _id: user_id, name: name },
        review,
        date
      );

      res.json({ status: "success" });

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // UPDATE REVIEW
  static async apiUpdateReview(req, res) {
    try {
      const review_id = req.params.id;
      const { user_id, review } = req.body;
      const date = new Date();

      const response = await ReviewsDAO.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      if (response.modifiedCount === 0) {
        return res.status(404).json({
          error: "Unable to update review. Not owner."
        });
      }

      res.json({ status: "success" });

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // DELETE REVIEW
  static async apiDeleteReview(req, res) {
    try {
      const review_id = req.params.id;
      const { user_id } = req.body;

      const response = await ReviewsDAO.deleteReview(
        review_id,
        user_id
      );

      if (response.deletedCount === 0) {
        return res.status(404).json({
          error: "Review not found or unauthorized"
        });
      }

      res.json({ status: "success" });

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
// Example axios calls for testing purposes:
// axios.post("https://localhost:5000/api/v1/movies/review", data)
// axios.delete("https://localhost:5000/api/v1/movies/review", { data: data })  
        // axios.put("https://localhost:5000/api/v1/movies/review", data)