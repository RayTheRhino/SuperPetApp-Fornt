import './Map.css'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const MyMap = ({center, onCenterChange}) => {
    const [shops, setShops] = useState({});
    const getGeolocation = async () => {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude, longitude } = position.coords;
            console.log(latitude);
            console.log(longitude);
            onCenterChange(latitude, longitude);
            const shopsQuery = `[out:json];
        node(around:50000, ${latitude}, ${longitude})["shop"="pet"];
        out;`;

                    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(shopsQuery)}`);
                    const data = await response.json();
                    const shops = data.elements.map(element => ({
                        name: element.tags.name,
                        lat: element.lat,
                        lon: element.lon,
                    }));
                    console.log(shops);
                    setShops(shops);

        } catch (error) {
            console.error("Error retrieving geolocation:", error);
        }
    };

    useEffect(() => {
        getGeolocation().then(()=>{
            console.log("worked!");
        })
    }, []);


    return (
        <MapContainer center={center} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {Object.keys(shops).map((key) => {
                const shop = shops[key];
                return (
                    <Marker key={`${shop.name}-${key}`} position={[shop.lat, shop.lon]}>
                        <Popup>
                            <div>
                                <strong>{shop.name}</strong>
                            </div>
                            <div>{shop.type}</div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default MyMap;