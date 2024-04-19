import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

//@ts-expect-error - weatherData mangler i GoogleMap
export default function GoogleMap({ weatherData}) {
    const [position, setPosition] = useState({ lat: 55.6761, lng: 12.5683 });

useEffect(() => {
    console.log("Weather data in GoogleMap component:", weatherData);
    if (weatherData && weatherData.position) {
        console.log("Position updated:", weatherData.position);
        setPosition(weatherData.position);
        console.log("Position updated:", weatherData.position);
    }
}, [weatherData]);

    return (
        <APIProvider apiKey={process.env.REACT_APP_API_KEY ?? ''}>
            <div style={{ height: "100vh", width: "100%" }}>
                <Map zoom={7} center={position} mapId={process.env.REACT_APP_MAP_ID}>
                    <AdvancedMarker position={position}></AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}
