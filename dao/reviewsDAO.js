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
      console.error(`Unable to establish collection handles: ${e}`);
    }
  }

  static async addReview(reviewData) {
    try {
      const review = {
        movie_id: new ObjectId(reviewData.movie_id),
        user_id: reviewData.user_id,
        name: reviewData.name,
        text: reviewData.text,
        date: reviewData.date
      };

      return await reviews.insertOne(review);

    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(review_id, user_id, text, date) {
    try {
      return await reviews.updateOne(
        { _id: new ObjectId(review_id), user_id: user_id },
        { $set: { text: text, date: date } }
      );

    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(review_id, user_id) {
    try {
      return await reviews.deleteOne({
        _id: new ObjectId(review_id),
        user_id: user_id
      });

    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}