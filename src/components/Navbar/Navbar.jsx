import { React, useContext } from "react";
import { Link } from "react-router-dom";
import Type from "../TypeWritter/typeWritter";
import UserContext from "../../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { loggedInUser } = useContext(UserContext);
  console.log("loggedInUser",loggedInUser);
  return (
    <div className="navbar">
      <div className="leftSide">
        <Type />
      </div>
      {loggedInUser&&(
      <div className="rightSide">
         {loggedInUser.role === "ADMIN" ? (
            <Link to="/"> Home </Link>
          ) : (
            <>
              <Link to="/"> Home </Link>
              <Link to="/shop"> Shop </Link>
              <Link to="/onlineShop">Online Store</Link>
              <Link to="/parks"> Parks </Link>
              <Link to="/chat"> Q&A </Link>
            </>
          )}
      </div>
)}
    </div>
  );
};
export default Navbar;
