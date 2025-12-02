const RestroCard = (props) => {
  const { restaurantData } = props;

  const {
    areaName,
    avgRating,
    name,
    cuisines,
    costForTwo,
    deliveryTime,
  } = restaurantData?.info || {};

  return (
  <div className="restro-card">
    <img src="https://reverepress.com/wp-content/uploads/2024/04/Untitled-design-2024-04-15T113052.059-1024x469.webp" alt="restro-logo" />
    <h3>{name}</h3>
    <p>{cuisines.join(", ")}</p>
    <p>{areaName}</p>

    <div className="restro-details">
      <span>⭐ {avgRating} </span>
      <span>{costForTwo}</span>
      <span>⏱ {deliveryTime} mins</span>
    </div>

  </div>
  );
};

export default RestroCard;