import { useState, useCallback, useRef, useEffect } from "react";
import { Button, Spinner, Offcanvas, OffcanvasHeader, OffcanvasBody, Badge } from 'reactstrap'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";
import { getLatLng } from "use-places-autocomplete"
import "./PlacesList.css"

const containerStyle = {
  width: '90vmin',
  height: '90vmin'
}

const center = {
  lat: 51.503146,
  lng: -0.119460
}

const libraries = ['places']

export default function PlacesList({ itinerary }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries
  })

  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const locationRef = useRef()
  const [places, setPlaces] = useState([])
  const [placesFound, setPlacesFound] = useState(false)
  const [markers, setMarkers] = useState([])
  const [selectedPlaceType, setSelectedPlaceType] = useState('bakery')
  const [showPlaceDetails, setShowPlaceDetails] = useState(false)

  // ? Future enhancement - allow places to be saved - removed to maintain clean code

  const onLoad = useCallback(function callback(map) {
    // ? Commented to prevent this resetting the center and zoom level
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    console.log('on unMount Map ->', map)
    setMap(null)
  }, [])

  // ? ----- fixing API when not in Strict Mode ----- ? //

  const handlePlaceSelect = async (place) => {
    try {
      if (map && place.geometry) {
        const result = await getLatLng(place)
        const mapCenter = {
          lat: result.lat,
          lng: result.lng
        }
        setSelectedLocation(mapCenter)
      } else {
        console.log('Map is null or place.geometry is not available')
      }
    } catch (err) {
      console.log("Error fetching location details: ", err)
    }
  }

  // ? ----- Autocomplete function -----

  function handleAutocompleteLoad(autocomplete) {
    autocomplete.setFields(['geometry'])
    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace()
      console.log('Auto - this is the place result ->', place)
      console.log('Auto - this is the map result ->', map)
      await handlePlaceSelect(place)
    })
  }

  // ? ----- fix for API when not in Strict Mode -> ensures Autocomplete can access map on first load ----- ? //

  useEffect(() => {
    if(map) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        locationRef.current,
        { fields: ["geometry"]}
      )
      autocomplete.addListener("place_changed", async () => {
        const place = autocomplete.getPlace()
        await handlePlaceSelect(place)
      })
    }
  }, [map])

  // ? ----- Places functions -----

  const findNearbyPlaces = (map, selectedLocation, placeType) => {
    if (map && selectedLocation) {
      const service = new window.google.maps.places.PlacesService(map);

      const handleSearchResults = (results, status, pagination) => {
        if (status !== "OK" || !results) {
          setPlacesFound('none')
          return;
        }
    
        setPlacesFound(true)
        addPlaces(results, map);
      };

      // Performing a nearby search using the placeType as selected from the drop down
      service.nearbySearch(
        { location: selectedLocation, radius: 1000, type: placeType },
        (results, status, pagination) => handleSearchResults(results, status, pagination)
      );
    }
  }

  const handlePlaceTypeChange = (event) => {
    setSelectedPlaceType(event.target.value)
  }

  const handleFindPlaces = () => {
    switch (selectedPlaceType) {
      case "bakery":
        findNearbyPlaces(map, selectedLocation, "bakery")
        break
      case "bar":
        findNearbyPlaces(map, selectedLocation, "bar")
        break
      case "cafe":
        findNearbyPlaces(map, selectedLocation, "cafe")
        break
      case "convenience_store":
        findNearbyPlaces(map, selectedLocation, "convenience_store")
        break
      case "landmark":
        findNearbyPlaces(map, selectedLocation, "landmark")
        break
      case "museum":
        findNearbyPlaces(map, selectedLocation, "museum")
        break
      case "night_club":
        findNearbyPlaces(map, selectedLocation, "night_club")
        break
      case "park":
        findNearbyPlaces(map, selectedLocation, "park")
        break
      case "restaurant":
        findNearbyPlaces(map, selectedLocation, "restaurant")
        break
      case "supermarket":
        findNearbyPlaces(map, selectedLocation, "supermarket")
        break
      case "tourist_attraction":
        findNearbyPlaces(map, selectedLocation, "tourist_attraction")
        break
      default:
        findNearbyPlaces(map, selectedLocation, "bakery")
        break
    }
  }

  // ? ----- adding markers and places to state ------
  function addPlaces(places, map) {
    const newPlaces = []

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        }
        console.log(place)

        const marker = new window.google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
          cursor: 'default',
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="info-window">
              <h5>${place.name}</h5>
              <p>Rating: ${place.rating} ${
                place.user_ratings_total > 0 
                  ? `(${place.user_ratings_total} reviews)` : `No reviews`
              }</p>
              <p>${place.vicinity}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>`
        })

        marker.addListener('click', () => {
          map.setCenter(place.geometry.location)
          infoWindow.open(map, marker)
        })

        markers.push(marker)
        // newMarkers.push(marker)

        newPlaces.push({
          placeId: place.place_id,
          marker,
          ...place,
        })
      }
    }
    setMarkers(markers)
    console.log(markers)
    setPlaces(newPlaces)
  }

  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    setMarkers([])
    setPlaces([])
    setPlacesFound(false)
  }

  function clearSearch() {
    setSelectedLocation(null)
    locationRef.current.value = ''
    clearMarkers()
  }

  const togglePlaceDetails = (placeId) => {
    setShowPlaceDetails((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }))
  }

  return isLoaded ? (
    <div className="rest-list-page">
      <div>
        <h1>Search Places</h1>
        <div className="mx-2">Enter a location and search the local area, or use the drop-down to filter for certain places</div>
        <Badge color="primary" className="mt-2">Destination: {itinerary.destination}</Badge>
        <hr/>
        <Autocomplete
          className="my-2"
          id="autocomplete"
          onLoad={handleAutocompleteLoad}
        >
          <div>
            <input placeholder="Enter location" ref={locationRef} />
            {selectedLocation !== null && (
              <button className="mx-2 px-3 x-btn" onClick={clearSearch}>X</button>
            )}
          </div>
        </Autocomplete>
        <select value={selectedPlaceType} onChange={handlePlaceTypeChange} >
          <option value="bakery">Bakeries</option>
          <option value="bar">Bars</option>
          <option value="cafe">Cafes</option>
          <option value="convenience_store">Convenience Stores</option>
          <option value="landmark">Landmarks</option>
          <option value="museum">Museums</option>
          <option value="night_club">Night Clubs</option>
          <option value="park">Parks</option>
          <option value="restaurant">Restaurants</option>
          <option value="supermarket">Supermarkets</option>
          <option value="tourist_attraction">Tourist Attractions</option>
        </select>
        <button type="submit" className="maps-btn mx-3 mb-3" onClick={handleFindPlaces}>Find</button>
        <button className="maps-btn" onClick={clearMarkers}>Clear Markers</button>
      </div>
      {placesFound === 'none' && (
        <div>No places found for selected filter</div>
      )}
      <div className="places-map-container mt-2">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || center}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </div>
      <hr/>
      {placesFound === true && (
        <div className="results-container responsive">
          <h2>Results</h2>
          <ul id="places">
            {places.map((place) => (
              <li key={place.place_id}>
                <div className="place-name" onClick={ () => {map.setCenter(place.geometry.location)}}>
                  <strong>{place.name}</strong>
                </div>
                <div>
                  Rating: {place.rating} <strong> | &nbsp;</strong>
                  <Button
                    onClick={() => togglePlaceDetails(place.place_id)}
                    id="place-more-btn"                
                  >
                    More
                  </Button>
                  <Offcanvas
                    key={place.place_id}
                    direction="end"
                    isOpen={showPlaceDetails[place.place_id]}
                    toggle={() => togglePlaceDetails(place.place_id)}
                  >
                    <OffcanvasHeader toggle={() => togglePlaceDetails(place.place_id)}>
                      {place.name}
                    </OffcanvasHeader>
                    <OffcanvasBody>
                      <strong>Rating:</strong> {place.rating}<br></br>
                      <strong>Ratings Total:</strong> {place.user_ratings_total > 0 ? `${place.user_ratings_total} reviews` : `No reviews`}<br></br>
                      <strong>Address:</strong> {place.vicinity}<br></br>
                      {place.price_level && (
                        <span>
                          <strong>Price Level:</strong> {place.price_level}
                          <br></br>
                        </span>
                      )}
                      <a 
                        className="g-maps-link"
                        href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </OffcanvasBody>
                  </Offcanvas>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div>
      <Button color="primary" disabled>
          <Spinner size="sm">
              Loading...
          </Spinner>
          <span>
              {' '}Loading
          </span>
      </Button>
    </div>
  )
}