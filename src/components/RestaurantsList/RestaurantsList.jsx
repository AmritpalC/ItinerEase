import { useState, useCallback, useEffect } from "react";
import "./RestaurantsList.css"
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { getGeocode, getLatLng } from "use-places-autocomplete"

const containerStyle = {
  width: '400px',
  height: '400px'
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

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
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

  useEffect(() => {
    if (map && selectedLocation) {
      const service = new window.google.maps.places.PlacesService(map);
      let getNextPage
      const moreButton = document.getElementById("more");
      // moreButton.onclick = function () {
      //   moreButton.disabled = true;
      //   if (getNextPage) {
      //     getNextPage();
      //   }
      // };

      const handleSearchResults = (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;

        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            pagination.nextPage()
          }
        }
      };

      // Perform a nearby search.
      service.nearbySearch(
        { location: selectedLocation, radius: 1000, type: "restaurant" },
        (results, status, pagination) => handleSearchResults(results, status, pagination)
      );
    }
  }, [map, selectedLocation]);

  function addPlaces(places, map) {
    const placesList = document.getElementById("places");

    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };

        new window.google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        const li = document.createElement("li");

        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

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

  return isLoaded ? (
    <>
      <div>
        <div>This is the restaurant list page</div>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.setFields(['geometry'])
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace()
              handlePlaceSelect(place)
            })
          }}
        >
          <div>
            <input placeholder="Enter location" />
            <button type="submit" onClick={() => setSelectedLocation(null)}>Go</button>
          </div>
        </Autocomplete>
        <button onClick={() => setSelectedLocation(null)}>Clear</button>
        <button onClick={() => setSelectedLocation(selectedLocation)}>Find Restaurants</button>
      </div>
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || center}
          zoom={10}
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
        </GoogleMap>
      </div>
      <div id="sidebar">
        <h2>Results</h2>
        <ul id="places"></ul>
        <button id="more">Load more results</button>
      </div>
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
    </>
  ) : (
    <div>Loading...</div>
  )
}