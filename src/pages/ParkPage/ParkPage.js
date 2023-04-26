import React from "react";
import './Components/Star'
import Comment from "./Components/Comment";
import Map from "./Components/Map";
import './ParkPage.css'
import {Link} from "react-router-dom";


const ParkPage = () =>{

    return(
        <div className='box'>
            <div className='left'>
                <div className="map">
                    <Map/>
                </div>
            </div>
            <div className='line'></div>
            < div className='right'>
                <div className="container">
                    <Comment/>
                </div>
            </div>
        </div>
    )
}

export  default  ParkPage;