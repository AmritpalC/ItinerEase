import { useState, useCallback } from "react";
import "./PlacesToVisitList.css"
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
}

const center = {
  lat: 51.503146,
  lng: -0.119460
}

export default function PlacesToVisitList() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handlePlaceSelect = (place) => {
    if (map && place.geometry) {
      const mapCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      map.panTo(mapCenter);
    }
  };

  return isLoaded ? (
    <div>
      {/* <Autocomplete onLoad={handlePlaceSelect} /> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </div>
  ) : (
  <></>
  )
}