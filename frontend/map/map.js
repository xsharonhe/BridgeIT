import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-map.api";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import { load } from "dotenv/types";

const libraries = ["places"];
const mapcontainerStyle = {
    width: "100vw",
    height: "100vh",
};
const center = {
    lat: 43.653225,
    lng: -79.383186,
}

export default function App() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return ( 
    <div>
        <GoogleMap 
            mapContainerStyle = { mapContainerStyle }
            zoom = { 8 }
            center = { center } >
        </GoogleMap> 
    </div> 
    );
}