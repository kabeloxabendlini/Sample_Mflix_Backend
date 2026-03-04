import express from "express";
import ReviewsController from "../api/reviews.controller.js";

const router = express.Router();

// CREATE
router.post("/", ReviewsController.apiPostReview);

// UPDATE
router.put("/:id", ReviewsController.apiUpdateReview);

// DELETE
router.delete("/:id", ReviewsController.apiDeleteReview);

export default router;