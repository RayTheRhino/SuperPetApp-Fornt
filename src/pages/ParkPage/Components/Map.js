import  React ,{useState} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

const Map = () =>{
    const {} = useLoadScript({
        googleMapsApiKey:""})

    return(
        <div>
          <div>Map</div>
        </div>
    )
}

export default Map;