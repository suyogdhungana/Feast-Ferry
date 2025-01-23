import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useGetRestaurantsByUser = (userId?: string, city?: string) => {
  const fetchRecommendedRestaurants = async () => {
    if (!userId || !city) {
      throw new Error("User ID and city are required to fetch recommended restaurants");
    }

    try {
      console.log("Fetching recommended restaurants for:", city, userId);
      const response = await fetch(`${API_BASE_URL}/api/restaurant/recommendations/${city}/${userId}`);

      if (!response.ok) {
        console.error("Error fetching recommendations. Status code:", response.status);
        throw new Error(`Failed to fetch recommended restaurants. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Error in fetching recommended restaurants:", error);
      throw new Error("Failed to fetch recommended restaurants");
    }
  };

  const { data: results, isLoading, isError, error } = useQuery(
    ["recommendedRestaurants", userId, city],
    fetchRecommendedRestaurants,
    {
      enabled: !!userId && !!city, // ensures the query only runs when both userId and city are available
    }
  );

  // You can also return error and isError for better error state handling in the UI
  return { results, isLoading, isError, error };
};


export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
