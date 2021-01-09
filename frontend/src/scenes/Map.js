import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { 
    GoogleMap, 
    useJsApiLoader,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { NightsStay } from "@styled-icons/material/NightsStay";

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
    lat: 43.651070, 
    lng: -79.347015
}

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const center = {
    lat: 43.651070, 
    lng: -79.347015
  };

  const [map, setMap] = useState(null);
  const [error, setError] = useState(false);
  const [darkSpots, setDarkSpots] = useState([]);
  const [darkSelected, setDarkSelected] = useState(null);
  const [hazards, setHazards] = useState([]);
  const [hazardSelected, setHazardSelected] = useState(null);

  useEffect(() => {
    axios
        .get(`http://localhost:8000/api/v1/darkspots`)
        .then(res => {
            setDarkSpots(res.data);
        })
        .catch(err => {
            setError(true);
        })
    axios
        .get(`http://localhost:8000/api/v1/hazards`)
        .then(res => {
            setHazards(res.data);
        })
        .catch(err => {
            setError(true);
        })
  }, []);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <Wrapper>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4.5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {darkSpots.map((darkSpot) => (
                <Marker
                    key={`${darkSpot.lat}-${darkSpot.lon}`}
                    position={{ lat: parseFloat(darkSpot.lat), lng: parseFloat(darkSpot.lon) }}
                    icon={{
                        url: 'https://www.clipartmax.com/png/middle/306-3069610_no-cell-phones-allowed-no-mobile-phone-sign-uk.png',
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                    onClick={() => setDarkSelected(darkSpot)}
                />
            ))}
            {hazards.map((hazard) => (
                <Marker
                    key={`${hazard.lat}-${hazard.lon}`}
                    position={{ lat: parseFloat(hazard.lat), lng: parseFloat(hazard.lon) }}
                    icon={{
                        url: 'https://png.pngtree.com/element_our/20190601/ourmid/pngtree-attention-hazard-warning-sign-psd-transparent-bottom-image_1329342.jpg',
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                    onClick={() => setHazardSelected(hazard)}
                />
            ))}
            {darkSelected ? (
                <InfoWindow position={{ lat: parseFloat(darkSelected.lat), lng: parseFloat(darkSelected.lon) }}>
                    <div> 
                        <p>City: {darkSelected.city} </p>
                        <p>Average drops: {darkSelected.avg_drops }</p>
                        <p>Percent affected: {darkSelected.percent_affected} </p>
                        <p>Risk: {darkSelected.avg_drops > 0.0080 ? 'HIGH' : 'MODERATE'}</p>
                    </div>
                </InfoWindow>
            ) : null}
            {hazardSelected ? (
                <InfoWindow position={{ lat: parseFloat(hazardSelected.lat), lng: parseFloat(hazardSelected.lon) }}>
                    <div> 
                        <p>City: {hazardSelected.city} </p>
                        <p>Severity score: {hazardSelected.severity_score}</p>
                        <p>Total Incidents: {hazardSelected.incidents_total} </p>
                        <p>Risk: {hazardSelected.severity_score > 1 ? 'HIGH' : 'MODERATE'}</p>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
      </Wrapper>
  ) : <div>Could not load</div>
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;
export default React.memo(Map);