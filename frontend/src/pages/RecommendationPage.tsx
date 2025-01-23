import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetRestaurantsByUser } from "@/api/RestaurantApi";
import { Restaurant } from "@/types";
import CuisineFilter from "@/components/CuisineFilter";
import { Button } from "@/components/ui/button";
import SearchResultInfo from "@/components/SearchResultInfo";
import { Banknote, Clock, Dot } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define the type for the search state
type SearchState = {
    selectedCuisines: string[];
    sortOption: string;
    page: number;
};

const RecommendationsPage = () => {

    const { userId, city } = useParams<{ userId?: string; city?: string }>();

    const { results, isLoading, isError, error } = useGetRestaurantsByUser(userId || '', city || '');

    // Properly define the state with SearchState type
    const [searchState, setSearchState] = useState<SearchState>({
        selectedCuisines: [],
        sortOption: "bestMatch", // Default sorting option
        page: 1, // Default page
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    };

    const toggleCuisineFilter = () => {
        setIsExpanded((prevState) => !prevState);
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="error">
                Error: {error instanceof Error ? error.message : "Something went wrong"}
            </div>
        );
    }

    if (!results?.data || results.data.length === 0) {
        return <div>No recommendations available</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={toggleCuisineFilter}
                />
            </div>

            <div id="main-content" className="flex flex-col gap-5">
                <h1 className="text-xl font-bold mb-5">Recommended Restaurants in {city}</h1>

                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo
                        total={results.pagination.total}
                        city={city}
                    />
                </div>

                {results.data.map((restaurant: Restaurant) => {
                    const cuisines = Array.isArray(restaurant.cuisines)
                        ? restaurant.cuisines
                        : typeof restaurant.cuisines === "string"
                            ? restaurant.cuisines.split(" ").filter(Boolean)
                            : [];
                    return (
                        <Link
                            to={`/detail/${restaurant._id}`}
                            className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
                        >
                            <AspectRatio ratio={16 / 6}>
                                <img
                                    src={restaurant.imageUrl}
                                    className="rounded-md w-full h-full object-cover"
                                />
                            </AspectRatio>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                                    {restaurant.restaurantName}
                                </h3>
                                <div id="card-content" className="grid md:grid-cols-2 gap-2">
                                    <div className="flex flex-row flex-wrap">
                                        {cuisines.map((item: string, index: number) => (
                                            <span key={index} className="flex">
                                                <span>{item}</span>
                                                {index < cuisines.length - 1 && <Dot />}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <div className="flex items-center gap-1 text-green-600">
                                            <Clock className="text-green-600" />
                                            {restaurant.estimatedDeliveryTime} mins
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Banknote />
                                            Delivery from Rs.{(restaurant.deliveryPrice / 100).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}

                <div className="flex justify-end mt-5">
                    <Button onClick={() => window.location.reload()} className="rounded-full bg-orange-500">
                        Refresh Recommendations
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationsPage;
