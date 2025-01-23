import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import axios from "axios";
import Order from "../models/order";
import User from "../models/user";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { userId, city } = req.params;
    console.log("Getting recommendations for user:", userId, "in city:", city);

    const recommendationsResponse = await axios.get(
      "http://localhost:5000/get-recommendations",
      {
        params: {
          user_id: userId,
          city: city,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Recommendations response:", recommendationsResponse.data);

    const recommendations = recommendationsResponse.data;

    if (recommendations && recommendations.length > 0) {
      return res.json({
        data: recommendations,
        pagination: {
          total: recommendations.length,
          page: 1,
          pages: Math.ceil(recommendations.length / 10),
        },
      });
    } else {
      return res.status(404).json({ message: "No recommendations found" });
    }
  } catch (error: unknown) {
    // Cast the error to an instance of Error type
    if (error instanceof Error) {
      console.error("Error fetching recommendations:", error.message);
      return res
        .status(500)
        .json({ message: "Error fetching recommendations" });
    }

    // If the error is not an instance of Error, we can fallback to a generic message
    console.error("Unknown error occurred:", error);
    return res.status(500).json({ message: "Error fetching recommendations" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// const searchRestaurant = async (req: Request, res: Response) => {
//   try {
//     const city = req.params.city;
//     const userId = req.userId;

//     const searchQuery = (req.query.searchQuery as string) || "";
//     const selectedCuisines = (req.query.selectedCuisines as string) || "";
//     const sortOption = (req.query.sortOption as string) || "lastUpdated";
//     const page = parseInt(req.query.page as string) || 1;

//     console.log(userId);
//     console.log(city);
//     if (userId) {
//       try {
//         const userOrders = await Order.find({ user: userId });

//         if (userOrders.length > 0) {
//           const recommendationsResponse = await axios.get(
//             "http://localhost:5000/get-recommendations",
//             {
//               params: {
//                 user_id: userId,
//                 city: city,
//               },
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           const recommendations = recommendationsResponse.data;

//           if (recommendations && recommendations.length > 0) {
//             const response = {
//               data: recommendations,
//               pagination: {
//                 total: recommendations.length,
//                 page,
//                 pages: Math.ceil(recommendations.length / 10), // Adjust pagination if needed
//               },
//             };

//             return res.json(response);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching recommendations:", err);
//         return res
//           .status(500)
//           .json({ message: "Error fetching recommendations" });
//       }
//     }

//     let query: any = {};

//     query["city"] = new RegExp(city, "i");

//     const cityCheck = await Restaurant.countDocuments(query);
//     if (cityCheck === 0) {
//       return res.status(404).json({
//         data: [],
//         pagination: {
//           total: 0,
//           page: 1,
//           pages: 1,
//         },
//       });
//     }

//     // Apply search query and selected cuisines filter
//     if (selectedCuisines) {
//       const cuisinesArray = selectedCuisines
//         .split(",")
//         .map((cuisine) => new RegExp(cuisine, "i"));

//       query["cuisines"] = { $all: cuisinesArray };
//     }

//     if (searchQuery) {
//       const searchRegex = new RegExp(searchQuery, "i");
//       query["$or"] = [
//         { restaurantName: searchRegex },
//         { cuisines: { $in: [searchRegex] } },
//       ];
//     }

//     const pageSize = 10;
//     const skip = (page - 1) * pageSize;

//     const restaurants = await Restaurant.find(query)
//       .sort({ [sortOption]: 1 })
//       .skip(skip)
//       .limit(pageSize)
//       .lean();

//     const total = await Restaurant.countDocuments(query);

//     const response = {
//       data: restaurants,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / pageSize),
//       },
//     };

//     return res.json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

export default {
  getRestaurant,
  searchRestaurant,
  getRecommendations,
};
