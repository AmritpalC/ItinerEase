import { useParams } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import * as itinerariesAPI from '../../utilities/itineraries-api'
import './ItineraryDetailPage.css'

export default function ItineraryDetailPage({ itineraries }) {
    let { itineraryName } = useParams();
    let itinerary = itineraries.find((iti) => iti.name === itineraryName)

    // const [itin, setItin] = useState([])

    // useEffect(function() {
    //     async function getItinerary() {
    //         const itinerary = await itinerariesAPI.getItinerary()
    //         setItin(itinerary)
    //     }
    //     getItinerary()
    // }, [])

    return (
        <>
            {/* <h1>Itinerary Details Page for {itin.name}</h1>
            <div>Name: {itin.name}</div>
            <div>Destination: {itin.destination}</div>
            <div>Date: {itin.date}</div>
            <hr />   */}
            <h1>Itinerary Details Page for {itinerary.name}</h1>
            <button>Delete Button</button>
            <h4>Will have all holiday information here in sections</h4>
            <div className="itinerary-sections">
                <div className="itinerary-item">1 - Itinerary - {itinerary.destination}</div>
                <div className="itinerary-item">2 - Budget - {itinerary.budget}</div>
                <div className="itinerary-item">3 - Places to Visit {itinerary.pointsOfInterest}</div>
                <div className="itinerary-item">4 - Restaurants {itinerary.restaurants}</div>
            </div>
        </>
    )
}