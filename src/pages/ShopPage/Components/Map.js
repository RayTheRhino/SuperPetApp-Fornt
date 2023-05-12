import './Map.css'
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const MyMap = () => {
    const [center, setCenter] = useState([32.0852999, 34.7817676]);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        // Use browser's geolocation API to get user's location
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude)
            console.log(longitude)
            setCenter([latitude, longitude]);
            const shopsQuery = `[out:json];
        node(around:50000, ${latitude}, ${longitude})["shop"="pet"];
        out;`;

            const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(shopsQuery)}`);
            const data = await response.json();
            const shops = data.elements.map(element => ({
                name: element.tags.name,
                type: element.tags.shop,
                lat: element.lat,
                lon: element.lon,
            }));
            console.log(shops);
            setShops(shops);

        });
    }, [])

    return (
        <MapContainer center={center} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {shops.map(shop => (
                <Marker key={`${shop.name}-${shop.type}`} position={[shop.lat, shop.lon]}>
                    <Popup>
                        <div>
                            <strong>{shop.name}</strong>
                        </div>
                        <div>
                            {shop.type}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MyMap;
