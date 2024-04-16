'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export default function GoogleMap() {
    const position = { lat: 55.6761, lng: 12.5683 };

    return (
        <APIProvider apiKey="AIzaSyDJBVobc5RDzFzP0zcddRX_FYWXm2tA6FU">
            <div style={{height:"100vh", width:"100vw"}}>
                <Map zoom={4} center={position} mapId={'15bed39311a5ebe3'}>
                    <AdvancedMarker position={position}>
                    </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}