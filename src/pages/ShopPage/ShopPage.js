import React, {useState} from "react";
import './Components/Star'
import Comment from "./Components/Comment";
import Map from "./Components/Map";
import './ShopPage.css'



const ShopPage = () =>{
    const [center, setCenter] = useState([32.0852999, 34.7817676]);

    const handleCenterChange = (latitude, longitude) => {
        setCenter([latitude, longitude]);
    };

    return(
        <div className='box'>
            <div className='left'>
                <div className="map">
                    <Map center={center} onCenterChange={handleCenterChange}/>
                </div>
            </div>
            <div className='line'></div>
            < div className='right'>
                <div className="container">
                    <Comment center={center}/>
                </div>
            </div>
        </div>
    )
}

export  default  ShopPage;