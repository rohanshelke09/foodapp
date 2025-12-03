import { useState } from "react";

const Header = () => {
  // let btnName = "Login";

  const [btnName,setBtnName]=useState("Login");
  console.log("Header rendered");

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
          <li>Home</li>
          <li>Contact</li>
          <li>About Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName ==='Login' ? setBtnName("Logout") : setBtnName("Login");
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
