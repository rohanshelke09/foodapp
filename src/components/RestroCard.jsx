import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestroCard = (props) => {
  const { restaurantData } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines = [],
    costForTwo,
    sla,
    id,
  } = restaurantData?.info || {};

  return (
    <Link to={"/restaurant/" + id} className="restro-card-link">
      <div className="restro-card">
        <img
          className="restro-logo"
          alt="restro-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <div className="restro-details">
          <h3>{name}</h3>
          <p>{cuisines.join(", ")}</p>
          <div className="resto-stats">
            <span>⭐ {avgRating}</span>
            <span>•</span>
            <span>{sla?.slaString}</span>
            <span>•</span>
            <span>{costForTwo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Higher order component
export const withPromotedLabel = (RestroCard) => {
  return (props) => (
    <div>
      <label>Promoted</label>
      <RestroCard {...props} />
    </div>
  );
};

export default RestroCard;