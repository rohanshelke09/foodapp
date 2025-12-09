import {  useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  // let btnName = "Login";

  const [btnName, setBtnName] = useState("Login");
  console.log("Header rendered");
  const isOnline=useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://marketplace.canva.com/EAGXsRURT9o/1/0/800w/canva-yellow-and-brown-kitchen-food-logo-kHpwGTmRzvg.jpg"
          alt="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Status: {isOnline ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};


export default Header;
