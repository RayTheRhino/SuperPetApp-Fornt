import './Map.css'
import  React ,{ useEffect,useState} from "react";
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const MyMap = () =>{
   const [center, setCenter] = useState([32.0852999,34.7817676]);
   const[parks,setParks] = useState([]);
   useEffect(() =>{
       // Use browser's geolocation API to get user's location
       navigator.geolocation.getCurrentPosition(async position => {
           const { latitude, longitude } = position.coords;
           console.log(latitude)
           console.log(longitude)
           setCenter([latitude, longitude]);
           const parksQuery = `[out:json];
            node(around:50000, ${latitude}, ${longitude})["leisure"="dog_park"];
            out;`;

           const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(parksQuery)}`);
           const data = await response.json();
           const parks = data.elements.map(element => ({
               name: element.tags.name,
               lat: element.lat,
               lon: element.lon,
           }));
           console.log(parks);
           setParks(parks);
       });
   }, [])

    return(
        <MapContainer center={center} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {parks.map(park => (
                <Marker key={park.name} position={[park.lat, park.lon]}>
                    <Popup>{park.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
export default MyMap;