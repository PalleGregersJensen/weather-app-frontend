'use client';

// import React from 'react';
import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export default function GoogleMap() {
    const [position, setPosition] = useState({ lat: 55.6761, lng: 12.5683 });
    // let position;
    // position = { lat: 55.6761, lng: 12.5683 };

    return (
        <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
            <div style={{ height: "100vh", width: "100vw" }}>
                <Map zoom={4} center={position} mapId={process.env.REACT_APP_MAP_ID}>
                    <AdvancedMarker position={position}></AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}