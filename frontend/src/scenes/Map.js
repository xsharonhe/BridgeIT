import React, { useCallback } from 'react';
import styled from "styled-components";
import { 
    GoogleMap, 
    useJsApiLoader,
    Marker
} from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
    lat: 43.651070, 
    lng: 79.347015
};

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState([{
    lat: 43.651070, 
    lng: 79.347015
}]);

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
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {markers.map(marker => (
                <Marker 
                    key={marker.lat}
                    position={{ lat: marker.lat, lng: marker.lng }}
                />
            ))}
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