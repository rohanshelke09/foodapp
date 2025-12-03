import { useEffect, useState } from "react";
import RestroCard from "./RestroCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText,setSearchText]=useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();

        const restaurants =
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        if (restaurants) {
          //solve bug of not rendering restaurants for resolve the becoz they dont modify the original data
          
          setListOfRestaurants(restaurants);
          setFilteredRestaurants(restaurants);
        } else {
          const restaurantsFromAlternativePath =
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          if (restaurantsFromAlternativePath) {
            setListOfRestaurants(restaurantsFromAlternativePath);
            setFilteredRestaurants(restaurantsFromAlternativePath);
          } else {
            console.error("Could not find restaurants in the expected paths.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // if (listOfRestaurants.length === 0) {
  //   return <Shimmer />;
  // }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
            <input type="text" placeholder="Search restaurants..."  value={searchText} onChange={(e)=>{
              setSearchText(e.target.value);
            }}/>
          <button
            //filter restro card and update the UI
            onClick={() => {
              console.log(searchText);
              const filterList = listOfRestaurants.filter((res) =>
                //some case typing issue that resolve all searches
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filterList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restro-container">
        {filteredRestaurants.map((restaurant) => (
          <RestroCard key={restaurant.info.id} restaurantData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
