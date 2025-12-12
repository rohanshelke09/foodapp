import {  useContext } from "react";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

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

  const {loggedInUser}=useContext(UserContext);

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
            <span>•</span>
            <span>{loggedInUser}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Higher order component
// export const withPromotedLabel = (RestroCard) => {
//   return (props) => (
//     <div>
//       <label>Promoted</label>
//       <RestroCard {...props} />
//     </div>
//   );
// };

export default RestroCard;