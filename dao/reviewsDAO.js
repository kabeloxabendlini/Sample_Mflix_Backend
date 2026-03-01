import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) return;

    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handle in ReviewsDAO: ${e}`);
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      return await reviews
        .find({ movie_id: new ObjectId(movieId) })
        .toArray();
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`);
      return [];
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date,
        review,
        movie_id: new ObjectId(movieId),
      };

      const result = await reviews.insertOne(reviewDoc);

      if (result.insertedCount === 1) {
        return { success: true, reviewId: result.insertedId };
      } else {
        return { success: false, message: "Failed to add review." };
      }

    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { success: false, error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const result = await reviews.updateOne(
        { _id: new ObjectId(reviewId), user_id: userId },
        { $set: { review, date } }
      );

      if (result.matchedCount === 0) {
        return { success: false, message: "Review not found or not authorized." };
      } else if (result.modifiedCount === 1) {
        return { success: true };
      } else {
        return { success: false, message: "Nothing was updated." };
      }

    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { success: false, error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const result = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

      if (result.deletedCount === 1) {
        return { success: true };
      } else {
        return { success: false, message: "Review not found or not authorized." };
      }

    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { success: false, error: e };
    }
  }
}