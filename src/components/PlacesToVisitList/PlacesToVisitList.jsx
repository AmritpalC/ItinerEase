import { useState, useCallback } from "react";
import "./PlacesToVisitList.css";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { getGeocode, getLatLng } from "use-places-autocomplete"
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete"
// import { Container } from "reactstrap";

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
    libraries: ['places']
  })

  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  // const { suggestions, setValue } = usePlacesAutocomplete()

  // const PlacesAutocomplete = ({ setSelected }) => {
  //   const {
  //     ready,
  //     value,
  //     setValue,
  //     suggestions: {status, data},
  //     clearSuggestions,
  //   } = usePlacesAutocomplete()
  // }

  const [inputValue, setInputValue] = useState("")

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  // const handlePlaceSelect = (place) => {
  //   if (map && place.geometry) {
  //     const mapCenter = {
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng()
  //     };
  //     map.panTo(mapCenter);
  //   }
  // }

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value)
  //   setValue(e.target.value)
  // }

  // const handlePlaceSelect = ({ description }) => {
  //   if (description) {
  //     setValue(description, false)
  //     setSelectedLocation(description)
  //   }
  // }

  // const position = selectedLocation ? {
  //   lat: selectedLocation.lat,
  //   lng: selectedLocation.lng
  // } : center

  // if (!isLoaded) return 

  const handlePlaceSelect = async (place) => {
    try {
      if (map && place.geometry) {
        const result = await getLatLng(place)
        const mapCenter = {
          lat: result.lat,
          lng: result.lng
        }
        setSelectedLocation(mapCenter)
      }
    } catch (err) {
      console.log("Error fetching location details: ", err)
    }
  }

  return isLoaded ? (
    <>
      <div>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.setFields(['geometry'])
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace()
              handlePlaceSelect(place)
            })
          }}
          // onPlaceChanged={(autocomplete) => {
          //   handlePlaceSelect(autocomplete.getPlace())
          // }}
        >
          <div>
            <input placeholder="Enter location" />
            <button type="submit">Go</button>
          </div>
        </Autocomplete>
      </div>
      {/* <Autocomplete onLoad={handlePlaceSelect} /> */}
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {selectedLocation && (
            <Marker position={selectedLocation} />
          )}
        </GoogleMap>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  )
}

//   return isLoaded ? (
//     <>
//       <div>
//         <Autocomplete
//           onLoad={handlePlaceSelect}
//           onPlaceChanged={handlePlaceSelect}
//         >
//           <div>
//             {/* <input 
//               placeholder="Enter location"
//               value={inputValue}
//               onChange={handleInputChange}
//             /> */}
//             <input 
//               placeholder="Enter location"
//               value={value}
              
//               onChange={handleInputChange}
//             />
//             <button type="submit" onClick={handlePlaceSelect} >Go</button>
//           </div>
//         </Autocomplete>
//       </div>
//       {/* <Autocomplete onLoad={handlePlaceSelect} /> */}
//       <div>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={selectedLocation ? null : center}
//           zoom={10}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//         >
//           { /* Child components, such as markers, info windows, etc. */ }
//           {selectedLocation && (
//             <Marker position={position} />
//           )}
//         </GoogleMap>
//       </div>
//     </>
//   ) : (
//     <div>Loading...</div>
//   )
// }