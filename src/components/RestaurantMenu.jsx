import React from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestMenu from "../utils/useRestMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestMenu(resId);


  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards.find((card) => card?.card?.card?.info)?.card?.card?.info ||
    {};

  const { itemCards } =
    resInfo?.cards
      .find((card) => card?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
        (card) =>
          card?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )?.card?.card || {};

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards &&
          itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - {" Rs."}
              {item.card.info.price / 100 ||
                item.card.info.defaultPrice / 100}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;