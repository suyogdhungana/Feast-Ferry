import express from "express";
import { param, query } from "express-validator"; // Use 'query' for query params
import RestaurantController, {
  getRecommendations,
} from "../controllers/RestaurantController";
import { jwtParse } from "../middleware/auth";

const router = express.Router();

// Route to get a restaurant by ID
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId parameter must be a valid string"),
  RestaurantController.getRestaurant
);

// Route to search restaurants by city
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),

  // Apply JWT middleware for authentication
  // jwtParse,

  RestaurantController.searchRestaurant
);

router.get(
  "/recommendations/:city/:userId",
  RestaurantController.getRecommendations
);

export default router;
