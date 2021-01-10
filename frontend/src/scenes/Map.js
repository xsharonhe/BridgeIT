/* global google */
import React from 'react';
import styled from "styled-components";
import axios from "axios";
import Switch from 'react-switch';
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
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
      containerElement: <div style={{ padding: '0 150px 150px 150px', margin: 'auto', height: `600px`, width: `600px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
        hazardSelected: null,
      }), {
        onHazardSelect: ({ hazardSelected }) => (hazard) => ({
          hazardSelected: hazard
        })
      }),
    withStateHandlers(() => ({
        darkSelected: null,
      }), {
        onDarkSelect: ({ darkSelected }) => (dark) => ({
          darkSelected: dark
        })
      }),
      withStateHandlers(() => ({
        isOpen: true,
      }), {
        onOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen
        })
      }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        axios
            .get(`http://localhost:8000/api/v1/darkspots`)
            .then(res => {
                this.setState({ darkSpots: res.data });
            })
            .catch(err => {
                console.log(err);
            })
        axios
            .get(`http://localhost:8000/api/v1/hazards`)
            .then(res => {
                this.setState({ hazards: res.data } );
            })
            .catch(err => {
                console.log(err);
            })

        const DirectionsService = new google.maps.DirectionsService();
        
        DirectionsService.route({
            origin: new google.maps.LatLng(44.3148, -85.6024),
            destination: new google.maps.LatLng(45.289722, -80.143889),
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            waypoints: [
                {
                   location: new google.maps.LatLng(44.991, -74.74)
                }
           ]
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
    directions,
    hazardSelected,
    onHazardSelect,
    darkSelected,
    onDarkSelect,
    isOpen,
    onOpen,
    id
}) =>
    <Wrapper>
        <div>{id}</div>
        <Container>
            <p> Control smart features </p>
            <label style={{ margin: '0 10px' }}> On</label>
            <Switch
                checked={isOpen}
                onChange={onOpen}
            />
            <label style={{ margin: '0 10px'}}> Off</label>
    </Container>
    <GoogleMap
        defaultZoom={4.5}
        defaultCenter={center}
    >
        {!!darkSpots && !!isOpen && darkSpots.map((darkSpot) => (
            <Marker
                key={`${darkSpot.lat}-${darkSpot.lon}`}
                position={{ lat: parseFloat(darkSpot.lat), lng: parseFloat(darkSpot.lon) }}
                icon={{
                    url: 'https://www.clipartmax.com/png/middle/306-3069610_no-cell-phones-allowed-no-mobile-phone-sign-uk.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}
                onClick={() => onDarkSelect(darkSpot)}
            />
        ))}
        {!!hazards && !!isOpen && hazards.map((hazard) => (
            <Marker
                key={`${hazard.lat}-${hazard.lon}`}
                position={{ lat: parseFloat(hazard.lat), lng: parseFloat(hazard.lon) }}
                icon={{
                    url: 'https://png.pngtree.com/element_our/20190601/ourmid/pngtree-attention-hazard-warning-sign-psd-transparent-bottom-image_1329342.jpg',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}
                onClick={() => onHazardSelect(hazard)}
            />
        ))}
        {!!isOpen && darkSelected ? (
            <InfoWindow position={{ lat: parseFloat(darkSelected.lat), lng: parseFloat(darkSelected.lon) }}>
                <div> 
                    <p>City: {darkSelected.city} </p>
                    <p>Average drops: {darkSelected.avg_drops }</p>
                    <p>Percent affected: {darkSelected.percent_affected} </p>
                    <p>Risk: {darkSelected.avg_drops > 0.0080 ? 'HIGH' : 'MODERATE'}</p>
                </div>
            </InfoWindow>
        ) : null}
        {!!isOpen && hazardSelected ? (
            <InfoWindow position={{ lat: parseFloat(hazardSelected.lat), lng: parseFloat(hazardSelected.lon) }}>
                <div> 
                    <p>City: {hazardSelected.city} </p>
                    <p>Severity score: {hazardSelected.severity_score}</p>
                    <p>Total Incidents: {hazardSelected.incidents_total} </p>
                    <p>Risk: {hazardSelected.severity_score > 1 ? 'HIGH' : 'MODERATE'}</p>
                </div>
            </InfoWindow>
        ) : null}
        {!!directions && (
            <DirectionsRenderer 
                directions={directions} 
            />
        )}
    </GoogleMap>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;

`;
const Container = styled.div`
    text-align: center; 
    margin-top: 20px;
`;
export default React.memo(Map);