import { useEffect, useState } from "react";
import RestroCard, { withPromotedLabel } from "./RestroCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText,setSearchText]=useState("");

  const RestroCardPromoted=withPromotedLabel(RestroCard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();

        // Dynamically find the restaurant data in the cards array
        const restaurantCard = json?.data?.cards.find(
          (card) =>
            card?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        const restaurants =
          restaurantCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        if (restaurants) {
          setListOfRestaurants(restaurants);
          setFilteredRestaurants(restaurants);
        } else {
          console.error(
            "Could not find restaurant data in the API response."
          );
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
          restaurant.info.promoted ?
          <RestroCardPromoted key={restaurant.info.id} restaurantData={restaurant} /> :
          <RestroCard key={restaurant.info.id} restaurantData={restaurant} />
        ))}
      </div>
    </div>
  );
};


export default Body;
