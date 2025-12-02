import { useEffect, useState } from "react";
import restaurantList from "../utils/data";
import RestroCard from "./RestroCard";


const Body = () => {
  const [listRestro, setListRestro] = useState(restaurantList);

  useEffect(()=>{
    console.log("useEffect called");
    fetchData();
  },[])


  const fetchData = async ()=>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
  }

  console.log("Body Rendered");
  
  return (
    <div className="body">
      <div className="search-box">
        <button
          className="filter-btn"
          onClick={() => {
            // filter restaurants based on rating greater than 4 (use original list)
            const filterList = restaurantList.filter(
              (res) => Number(res.info?.avgRating) > 4
            );
            console.log(filterList);
            setListRestro(filterList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restro-container">
        {listRestro.map((restaurant) => (
          // key is important to identify each element uniquely
          <RestroCard key={restaurant.info.id} restaurantData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
