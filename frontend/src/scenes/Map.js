/* global google */
import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { compose, withProps, lifecycle } from "recompose";
import { 
    GoogleMap, 
    Marker,
    InfoWindow,
    DirectionsRenderer,
    withScriptjs,
    withGoogleMap,
} from 'react-google-maps';

const center = {
    lat: 43.651070, 
    lng: -79.347015
}

const Map = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `600px`, width: `600px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        axios
            .get(`http://localhost:8000/api/v1/darkspots`)
            .then(res => {
                this.setState({darkSpots: res.data});
            })
            .catch(err => {
                console.log(err);
            })
        axios
            .get(`http://localhost:8000/api/v1/hazards`)
            .then(res => {
                this.setState({hazards: res.data} );
            })
            .catch(err => {
                console.log(err);
            })
            
        const DirectionsService = new google.maps.DirectionsService();
   
        DirectionsService.route({
            origin: new google.maps.LatLng(44.3148, -85.6024),
            destination: new google.maps.LatLng(45.289722, -80.143889),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
)(({
    darkSpots,
    hazards,
    directions
}) =>
    <GoogleMap
      defaultZoom={4.5}
      defaultCenter={center}
    >
        {!!darkSpots && darkSpots.map((darkSpot) => (
            <Marker
                key={`${darkSpot.lat}-${darkSpot.lon}`}
                position={{ lat: parseFloat(darkSpot.lat), lng: parseFloat(darkSpot.lon) }}
                icon={{
                    url: 'https://www.clipartmax.com/png/middle/306-3069610_no-cell-phones-allowed-no-mobile-phone-sign-uk.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}
            />
        ))}
        {!!hazards && hazards.map((hazard) => (
            <Marker
                key={`${hazard.lat}-${hazard.lon}`}
                position={{ lat: parseFloat(hazard.lat), lng: parseFloat(hazard.lon) }}
                icon={{
                    url: 'https://png.pngtree.com/element_our/20190601/ourmid/pngtree-attention-hazard-warning-sign-psd-transparent-bottom-image_1329342.jpg',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}
            />
        ))}
        {!!directions && (
            <DirectionsRenderer 
                directions={directions} 
            />
        )}
    </GoogleMap>
  );

// const Map = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyC0eUPfjjKFyx_uosHpQyWIBoP-Uo1fDmg',
//     libraries: ["places"]
//   })

//   const center = {
//     lat: 43.651070, 
//     lng: -79.347015
//   };

// {darkSelected ? (
//     <InfoWindow position={{ lat: parseFloat(darkSelected.lat), lng: parseFloat(darkSelected.lon) }}>
//         <div> 
//             <p>City: {darkSelected.city} </p>
//             <p>Average drops: {darkSelected.avg_drops }</p>
//             <p>Percent affected: {darkSelected.percent_affected} </p>
//             <p>Risk: {darkSelected.avg_drops > 0.0080 ? 'HIGH' : 'MODERATE'}</p>
//         </div>
//     </InfoWindow>
// ) : null}
// {hazardSelected ? (
//     <InfoWindow position={{ lat: parseFloat(hazardSelected.lat), lng: parseFloat(hazardSelected.lon) }}>
//         <div> 
//             <p>City: {hazardSelected.city} </p>
//             <p>Severity score: {hazardSelected.severity_score}</p>
//             <p>Total Incidents: {hazardSelected.incidents_total} </p>
//             <p>Risk: {hazardSelected.severity_score > 1 ? 'HIGH' : 'MODERATE'}</p>
//         </div>
//     </InfoWindow>
// ) : null}
//   const [map, setMap] = useState(null);
//   const [error, setError] = useState(false);
//   const [darkSpots, setDarkSpots] = useState([]);
//   const [darkSelected, setDarkSelected] = useState(null);
//   const [hazards, setHazards] = useState([]);
//   const [hazardSelected, setHazardSelected] = useState(null);
//   const [directions, setDirections] = useState();

//   useEffect(() => {
//     axios
//         .get(`http://localhost:8000/api/v1/darkspots`)
//         .then(res => {
//             setDarkSpots(res.data);
//         })
//         .catch(err => {
//             setError(true);
//         })
//     axios
//         .get(`http://localhost:8000/api/v1/hazards`)
//         .then(res => {
//             setHazards(res.data);
//         })
//         .catch(err => {
//             setError(true);
//         })
//   }, []);

//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map);
//   }, [])

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null)
//   }, []);

//     const origin = { lat: 40.756795, lng: -73.954298 };
//     const destination = { lat: 41.756795, lng: -78.954298 };


//     var directionsService = new window.google.maps.DirectionsService();
//     var directionsRenderer = new window.google.maps.DirectionsRenderer();
//     console.log(directionsService)
//   return isLoaded ? (
//       <Wrapper>
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={4.5}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//         >
//         </GoogleMap>
//       </Wrapper>
//   ) : <div>Could not load</div>
// }

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;
export default React.memo(Map);