import './Map.css'
import  React ,{ useEffect,useState} from "react";
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const MyMap = ({center, onCenterChange}) =>{
   const[parks,setParks] = useState([]);

    const getGeolocation = async () => {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude, longitude } = position.coords;
            console.log(latitude)
            console.log(longitude)
            onCenterChange(latitude, longitude);
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
            setParks(parks);

        } catch (error) {
            console.error("Error retrieving geolocation:", error);
        }
    };

    useEffect(() => {
        getGeolocation().then(()=>{
            console.log("worked!");
        })
    }, []);


    return(
        <MapContainer center={center} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {Object.keys(parks).map((key) =>{
                const park = parks[key];
                return(
                    <Marker key={`${park.name}}-${key}`} position={[park.lat, park.lon]}>
                        <Popup>
                            <div>
                                <strong> {park.name}</strong>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}
export default MyMap;