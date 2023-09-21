import { useState, useCallback, useRef } from "react";
import "./RestaurantsList.css"
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { getGeocode, getLatLng } from "use-places-autocomplete"

const containerStyle = {
  width: '90vmin',
  height: '90vmin'
}

const center = {
  lat: 51.503146,
  lng: -0.119460
}

export default function RestaurantList() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ['places']
  })

  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  // const [restaurants, setRestaurants] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  // const [autcomplete, setAutocomplete] = useState(null)
  const locationRef = useRef()
  // const [restaurantsFound, setRestaurantsFound] = useState(false)

  // ? Changing again
  // const [nextPageToken, setNextPageToken] = useState(null)
  // const [places, setPlaces] = useState([])
  const [markers, setMarkers] = useState([])
  const [selectedPlaceType, setSelectedPlaceType] = useState(null)
  // ? ------

  const onLoad = useCallback(function callback(map) {
    // ? Commented to prevent this resetting the center and zoom level
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handlePlaceSelect = async (place) => {
    try {
      if (map && place.geometry) {
        const result = await getLatLng(place)
        const mapCenter = {
          lat: result.lat,
          lng: result.lng
        }
        setSelectedLocation(mapCenter)
        // findNearbyRestaurants(mapCenter)
        // setCurrentPage(1)
        // setNextPageToken(null)
        // ? Changing again ----
        // loadNearbyRestaurants(mapCenter)
        // ? ---------
      }
    } catch (err) {
      console.log("Error fetching location details: ", err)
    }
  }

  // const handleSearchResults = (results, status, pagination ) => {
  //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //     setRestaurants(results)

  //     if (pagination && pagination.hasNextPage) {
  //       setCurrentPage(currentPage + 1)
  //       pagination.nextPage()
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (map && selectedLocation && currentPage === 1) {
  //     const service = new window.google.maps.places.PlacesService(map)
  //     service.nearbySearch(
  //       {
  //         location: selectedLocation,
  //         radius: 1000,
  //         type: "restaurant",
  //       },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     )
  //   }
  // }, [map, selectedLocation, currentPage])

  // ! Trying again with docs
  // ? --------

  // useEffect(() => {
  //   if (map && selectedLocation) {
  //     const service = new window.google.maps.places.PlacesService(map);
  //     let getNextPage
  //     const moreButton = document.getElementById("more");
  //     // moreButton.onclick = function () {
  //     //   moreButton.disabled = true;
  //     //   if (getNextPage) {
  //     //     getNextPage();
  //     //   }
  //     // };

  //     const handleSearchResults = (results, status, pagination) => {
  //       if (status !== "OK" || !results) return;

  //       addPlaces(results, map);
  //       moreButton.disabled = !pagination || !pagination.hasNextPage;

  //       if (pagination && pagination.hasNextPage) {
  //         getNextPage = () => {
  //           pagination.nextPage()
  //         }
  //       }
  //     };

  //     // Perform a nearby search.
  //     service.nearbySearch(
  //       { location: selectedLocation, radius: 1000, type: "restaurant" },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     );
  //   }
  // }, [map, selectedLocation]);

  // !
  // ? Changing to dropdown for DRYer code
  // const findNearbyRestaurants = (map, selectedLocation) => {
  //   if (map && selectedLocation) {
  //     const service = new window.google.maps.places.PlacesService(map);
  //     let getNextPage
  //     const moreButton = document.getElementById("more");
  //     // moreButton.onclick = function () {
  //     //   moreButton.disabled = true;
  //     //   if (getNextPage) {
  //     //     getNextPage();
  //     //   }
  //     // };

  //     const handleSearchResults = (results, status, pagination) => {
  //       if (status !== "OK" || !results) return;

  //       addPlaces(results, map);
  //       moreButton.disabled = !pagination || !pagination.hasNextPage;

  //       if (pagination && pagination.hasNextPage) {
  //         getNextPage = () => {
  //           pagination.nextPage()
  //         }
  //       }
  //     };

  //     // Perform a nearby search.
  //     service.nearbySearch(
  //       { location: selectedLocation, radius: 1000, type: "restaurant" },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     );
  //   }
  // }

  // !

  // const findNearbyRestaurants = (map, selectedLocation) => {
  //   if (map && selectedLocation) {
  //     const service = new window.google.maps.places.PlacesService(map);

  //     const handleSearchResults = (results, status, pagination) => {
  //       if (status !== "OK" || !results) return;

  //       addPlaces(results, map);
  //     };

  //     // Perform a nearby search.
  //     service.nearbySearch(
  //       { location: selectedLocation, radius: 1000, type: "restaurant" },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     );
  //   }
  // }

  // const findRestaurants = () => {
  //   findNearbyRestaurants(map, selectedLocation)
  // }

  // const findNearbyCafes = (map, selectedLocation) => {
  //   if (map && selectedLocation) {
  //     const service = new window.google.maps.places.PlacesService(map);

  //     const handleSearchResults = (results, status, pagination) => {
  //       if (status !== "OK" || !results) return;

  //       addPlaces(results, map);
  //     };

  //     // Perform a nearby search.
  //     service.nearbySearch(
  //       { location: selectedLocation, radius: 1000, type: "cafe" },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     );
  //   }
  // }

  // function findCafes() {
  //   findNearbyCafes(map, selectedLocation)
  // }

  // const findNearbyTouristAttractions = (map, selectedLocation) => {
  //   if (map && selectedLocation) {
  //     const service = new window.google.maps.places.PlacesService(map);

  //     const handleSearchResults = (results, status, pagination) => {
  //       if (status !== "OK" || !results) return;

  //       addPlaces(results, map);
  //     };

  //     // Perform a nearby search.
  //     service.nearbySearch(
  //       { location: selectedLocation, radius: 1000, type: "tourist_attraction" },
  //       (results, status, pagination) => handleSearchResults(results, status, pagination)
  //     );
  //   }
  // }

  // function findTouristAttractions() {
  //   findNearbyTouristAttractions(map, selectedLocation)
  // }

  // !
  // ? Drop down attempt
  const findNearbyPlaces = (map, selectedLocation, placeType) => {
    if (map && selectedLocation) {
      const service = new window.google.maps.places.PlacesService(map);

      const handleSearchResults = (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        addPlaces(results, map);
      };

      // Perform a nearby search.
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
      case "landmark":
        findNearbyPlaces(map, selectedLocation, "landmark")
        break
      case "museum":
        findNearbyPlaces(map, selectedLocation, "museum")
        break
      case "park":
        findNearbyPlaces(map, selectedLocation, "park")
        break
      case "restaurant":
        findNearbyPlaces(map, selectedLocation, "restaurant")
        break
      case "tourist_attraction":
        findNearbyPlaces(map, selectedLocation, "tourist_attraction")
        break
      default:
        findNearbyPlaces(map, selectedLocation, "bakery")
        break
    }
  }
  // !

  // ? ------
  // ? ------- changes    ------
  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
    console.log(placesList)

    while (placesList.firstChild) {
      placesList.removeChild(placesList.firstChild);
    }

    // const newPlaces = []
    const newMarkers = []

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        }

        const marker = new window.google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        })

        newMarkers.push(marker)

        const li = document.createElement("li");

        li.textContent = place.name;
        placesList.appendChild(li)
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location)
        })

        // newPlaces.push({
        //   placeId: place.place_id,
        //   marker,
        //   ...place,
        // })

      }
    }
    setMarkers(newMarkers)
    // if (placesList.length > 0) {
    //   setRestaurantsFound(true)
    // }
    // setRestaurantsFound(placesList.length > 0)
  }

  // const clearMarkers = () => {
  //   if (map && places.length > 0) {
  //     places.forEach((place) => {
  //       if (place.marker) {
  //         place.market.setMap(null)
  //       }
  //     })
  //     setPlaces([])
  //   }
  // }

  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    setMarkers([])
    // setRestaurantsFound(false)
  }

  function clearSearch() {
    // const autocomplete = document.getElementById('autocomplete')

    // if (autocomplete) {
    //   autocomplete.value = ''
    //   setSelectedLocation(null)
    // }
    setSelectedLocation(null)
    locationRef.current.value = ''
    clearMarkers()
  }

  // const clearMarkers = () => {
  //   if (map) {
  //     const markers = map.getMarkers()
  //     markers.forEach((marker) => {
  //       marker.setMap(null)
  //     })
  //   }
  // }

  // ? ----------------

  // const service = new google.maps.places.PlacesService(map);
  // let getNextPage;
  // const moreButton = document.getElementById("more");

  // moreButton.onclick = function () {
  //   moreButton.disabled = true;
  //   if (getNextPage) {
  //     getNextPage();
  //   }
  // };

  // // Perform a nearby search.
  // service.nearbySearch(
  //   { location: selectedLocation, radius: 1000, type: "restaurant" },
  //   (results, status, pagination) => {
  //     if (status !== "OK" || !results) return;

  //     addPlaces(results, map);
  //     moreButton.disabled = !pagination || !pagination.hasNextPage;
  //     if (pagination && pagination.hasNextPage) {
  //       getNextPage = () => {
  //         // Note: nextPage will call the same handler function as the initial call
  //         pagination.nextPage();
  //       };
  //     }
  //   },
  // );
  
  // function addPlaces(places, map) {
  //   const placesList = document.getElementById("places");

  //   for (const place of places) {
  //     if (place.geometry && place.geometry.location) {
  //       const image = {
  //         url: place.icon,
  //         size: new google.maps.Size(71, 71),
  //         origin: new google.maps.Point(0, 0),
  //         anchor: new google.maps.Point(17, 34),
  //         scaledSize: new google.maps.Size(25, 25),
  //       };

  //       new google.maps.Marker({
  //         map,
  //         icon: image,
  //         title: place.name,
  //         position: place.geometry.location,
  //       });

  //       const li = document.createElement("li");

  //       li.textContent = place.name;
  //       placesList.appendChild(li);
  //       li.addEventListener("click", () => {
  //         map.setCenter(place.geometry.location);
  //       });
  //     }
  //   }
  // }

  // const findNearbyRestaurants = async (location) => {
  //   const service = new window.google.maps.places.PlacesService(map)

  //   await service.nearbySearch(
  //     {
  //       location,
  //       radius: 1000,
  //       type: "restaurant"
  //     },
  //     (results, status) => {
  //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //         setRestaurants(results)
  //       }
  //     }
  //   )
  // }

  // const findNearbyRestaurants = async (location) => {
  //   const service = new window.google.maps.places.PlacesService(map);
  
  //   const performSearch = async (pageToken) => {
  //     const options = {
  //       location,
  //       radius: 1000, // Adjust this value based on your desired search radius
  //       type: "restaurant",
  //       pageToken,
  //     };
  
  //     // if (pageToken) {
  //     //   options.pagetoken = pageToken;
  //     // }
  
  //     return new Promise((resolve, reject) => {
  //       service.nearbySearch(options, (results, status, pagination) => {
  //         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //           resolve({ results, pagination });
  //         } else {
  //           reject(status);
  //         }
  //       });
  //     });
  //   };
  
  //   let allResults = [];
  //   let nextPageToken = null;
  
  //   do {
  //     try {
  //       const { results, pagination } = await performSearch(nextPageToken);
  //       allResults = allResults.concat(results);
  //       nextPageToken = pagination.hasNextPage ? pagination.nextPageToken : null;
  //     } catch (error) {
  //       console.error("Error fetching restaurant results:", error);
  //       break;
  //     }
  //   } while (nextPageToken);
  //   setRestaurants(allResults)
  //   console.log(allResults)
  // }

  // ! --- commented out

  // const loadNearbyRestaurants = async (location) => {
  //   if (!map) return;

  //   const service = new window.google.maps.places.PlacesService(map);

  //   const options = {
  //     location,
  //     radius: 1000,
  //     type: "restaurant",
  //   }

  //   if (nextPageToken) {
  //     options.pageToken = nextPageToken; // Use the nextPageToken for pagination
  //   }

  //   service.nearbySearch(options, (results, status, pagination) => {
  //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //       setPlaces((prevPlaces) => [...prevPlaces, ...results]) // Append new results
  //       setNextPageToken(pagination.hasNextPage ? pagination.nextPageToken : null)
  //     }
  //   })
  // }

  // const handleLoadMoreResults = () => {
  //   if (nextPageToken) {
  //     loadNearbyRestaurants(selectedLocation);
  //   }
  // };

  // const handleBulletPointClick = (place) => {
  //   if (map && place.geometry && place.geometry.location) {
  //     const locatio
  //   }
  // }
  //         li.addEventListener("click", () => {
  //         map.setCenter(place.geometry.location);

  return isLoaded ? (
    <div className="rest-list-page">
      <div>
        <div>Enter a location and search the local area, or use the drop-down to filter for certain places</div>
        <Autocomplete
          className="my-2"
          id="autocomplete"
          onLoad={(autocomplete) => {
            autocomplete.setFields(['geometry'])
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace()
              handlePlaceSelect(place)
            })
            // setAutocomplete(autocomplete)
          }}
        >
          <div>
            <input placeholder="Enter location" ref={locationRef} />
            {/* <button type="submit" onClick={() => setSelectedLocation(null)}>Go</button> */}
            {/* <button 
              type="submit"
              onClick={() => {
                const autocomplete = document.getElementById("autocomplete")
                if (autocomplete) {
                  const place = autocomplete.getPlace()
                  handlePlaceSelect(place)}
                }
              }
            >
              Go
            </button> */}
            {locationRef && (
              <button className="mx-2 px-3 x-btn" onClick={clearSearch}>X</button>
            )}
          </div>
        </Autocomplete>
        {/* <button className="mb-2 mx-2" onClick={() => setSelectedLocation(null)}>Clear</button> */}
        {/* <button onClick={() => setSelectedLocation(selectedLocation)}>Find Restaurants</button> */}
        {/* <button type="submit" className="maps-btn" onClick={findRestaurants}>Find Restaurants</button>
        <button type="submit" className="maps-btn mx-3 mb-3" onClick={findCafes}>Find Cafes</button>
        <button type="submit" className="maps-btn" onClick={findTouristAttractions}>Find Tourist Attractions</button> */}
        <select value={selectedPlaceType} onChange={handlePlaceTypeChange} >
          <option value="bakery">Bakery</option>
          <option value="bar">Bars</option>
          <option value="cafe">Cafes</option>
          <option value="landmark">Landmarks</option>
          <option value="museum">Museums</option>
          <option value="park">Parks</option>
          <option value="restaurant">Restaurants</option>
          <option value="tourist_attraction">Tourist Attractions</option>
        </select>
        <button type="submit" className="maps-btn mx-3 mb-3" onClick={handleFindPlaces}>Find</button>
        <button className="maps-btn" onClick={clearMarkers}>Clear Markers</button>
        {/* Commented out */}
        {/* <button onClick={() => loadNearbyRestaurants(selectedLocation)}>Find Restaurants</button> */}
      </div>
      <div className="rest-map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || center}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {selectedLocation && <Marker position={selectedLocation} />}
          {/* {restaurants.length > 0 && (
            <Marker
              position={restaurants[0].geometry.location}
              icon={{
                url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )} */}
          {/* {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.place_id}
              position={restaurant.geometry.location}
              icon={{
                url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))} */}
          {/* {places.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              title={place.name}
              icon={{
                url: place.icon,
                size: new window.google.maps.Size(71, 71),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(17, 34),
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            />
          ))} */}
        </GoogleMap>
      </div>
      <hr/>
      {/* {restaurantsFound && ( */}
        <div id="sidebar">
          <h2>Results</h2>
          {/* Commented */}
          <ul id="places"></ul>
          <button id="more">Load more results</button>
        </div>
      {/* )} */}
      {/* Commented */}
      {/* {places.length > 0 && (
        <div id="sidebar">
          <h2>Results</h2>
          <ul id="places">
            {places.map((place, index) => (
              // <li key={index}>{place.name}</li>
              <li key={place.place_id}>
                <strong>Name:</strong> {place.name} - <strong>Rating:</strong> {place.rating} ({place.user_ratings_total} reviews) - 
                <br></br>
                <strong>Address:</strong> {place.vicinity} - <strong>Price:</strong> {place.price_level} £££
              </li>
            ))}
          </ul> */}
          {/* {!nextPageToken && (
            <h4>No Next Page Token</h4>
          )} */}
          {/* Commented */}
          {/* {nextPageToken ? (
            <button id="more" onClick={handleLoadMoreResults}>
              Load more results
            </button>
          ) : (
            <h4>No Next Page Token</h4>
          )}
        </div>
      )} */}
      {/* {restaurants.length > 0 && (
        <>
          <div className="restaurants-list">
            <h2>Local Restaurants</h2>
            <ul>
              {restaurants.map((restaurant) => (
                <li key={restaurant.place_id}><strong>Name:</strong> {restaurant.name} - <strong>Rating:</strong> {restaurant.rating} - <strong>Address:</strong> {restaurant.vicinity}</li>
              ))}
            </ul>
          </div>
          <div>Current Page: {currentPage}</div>
          <button 
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
                // findNearbyRestaurants(selectedLocation, currentPage - 1)
              }
            }}
          >
            Previous Page
          </button>
          <button 
            onClick={() => {
              setCurrentPage(currentPage + 1)
              // const nextPage = currentPage + 1
              // setCurrentPage(nextPage)
              // findNearbyRestaurants(selectedLocation, nextPage)
            }}
          >
            Next Page
          </button>
        </>
      )} */}
    </div>
  ) : (
    <div>Loading...</div>
  )
}