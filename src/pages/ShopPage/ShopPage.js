import React from "react";
import './Components/Star'
import Comment from "./Components/Comment";
import Map from "./Components/Map";
import './ShopPage.css'



const ShopPage = () =>{

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

export  default  ShopPage;