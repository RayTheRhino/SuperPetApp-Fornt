import React,{useState} from "react";
import {Link} from "react-router-dom";
import Type from "../TypeWritter/typeWritter";
import './Navbar.css'

const Navbar = () =>{

    return(
        <div className='navbar'>
            <div className= 'leftSide' >
                <Type/>
            </div>
            <div className="rightSide">
                <Link to="/"> Home </Link>
                <Link to="/adopt"> Adopt </Link>
                <Link to="/shop"> Shop </Link>
                <Link to="/parks"> Parks </Link>
                <Link to="/chat"> Q&A </Link>
                <Link to="/connect-us"> Connect </Link>
                <Link to="/login"> Login </Link>

            </div>
        </div>
    );
}
export default Navbar;