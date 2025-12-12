import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestMenu from "../utils/useRestMenu";
import { CDN_URL } from "../utils/constants";

const RestaurantCategory = () => {
  const { resId } = useParams();
  const { resInfo, loading, error } = useRestMenu(resId);
  const [openCategory, setOpenCategory] = useState(0);

  if (loading) {
    return <Shimmer />;
  }

  if (error || !resInfo) {
    return (
      <div className="error-container">
        <h2>Error loading restaurant menu</h2>
        <p>{error || "Please try again later"}</p>
      </div>
    );
  }

  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
    feeDetails,
  } = resInfo?.cards?.[0]?.card?.card?.info || {};

  const categories =
    resInfo?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="restaurant-menu-container">
      <div className="restaurant-summary">
        <div>
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisines">{cuisines?.join(", ")}</p>
          <p className="restaurant-location">
            {areaName}, {feeDetails?.message}
          </p>
        </div>
        <div className="restaurant-rating">
          <span className="rating-value">⭐ {avgRating}</span>
          <span className="rating-count">{totalRatingsString}</span>
        </div>
      </div>

      <div className="restaurant-menu">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MenuItemCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              isOpen={index === openCategory}
              setIsOpen={() => setOpenCategory(index)}
            />
          ))
        ) : (
          <div className="no-items">No menu items available</div>
        )}
      </div>
    </div>
  );
};

const MenuItemCategory = ({ data, isOpen, setIsOpen }) => {
  return (
    <div className="menu-category">
      <div className="category-header" onClick={setIsOpen}>
        <h3 className="category-title">
          {data.title} ({data.itemCards.length})
        </h3>
        <span className="category-toggle">{isOpen ? "🔼" : "🔽"}</span>
      </div>
      {isOpen && <MenuItemList items={data.itemCards} />}
    </div>
  );
};

const MenuItemList = ({ items }) => {
  return (
    <div className="menu-item-list">
      {items.map((item) => (
        <div key={item.card.info.id} className="menu-item">
          <div className="item-details">
            <h4 className="item-name">{item.card.info.name}</h4>
            <p className="item-price">
              ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </p>
            <p className="item-description">{item.card.info.description}</p>
          </div>
          <div className="item-image-container">
            <img
              className="item-image"
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCategory;
