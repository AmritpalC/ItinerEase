import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as itinerariesAPI from '../../utilities/itineraries-api'
import './ItineraryDetailPage.css'
// import { useLocation } from 'react-router-dom'

export default function ItineraryDetailPage({ itinerariesList }) {
    // const [itinerariesList, setItinerariesList] = useState([])

    // useEffect(function() {
    //     async function getItineraries() {
    //         const itineraries = await itinerariesAPI.getAllForUser()
    //         setItinerariesList(itineraries)
    //     }
    //     getItineraries()
    // }, [])

    let { itineraryName } = useParams();
    let itinerary = itinerariesList.find((i) => i.name === itineraryName)

    // const [itinerary, setItinerary] = useState([])

    // useEffect(function() {
    //     async function getItinerary() {
    //         const fetchedItinerary = await itinerariesAPI.getItinerary()
    //         setItinerary(fetchedItinerary)
    //         console.log(itinerary)
    //     }
    //     getItinerary()
    // }, [itinerary])

    // const location = useLocation()
    // const itinerary = location.state?.itinerary
    // console.log(itinerary)

    async function handleDelete(itinerary) {
        try {
            await itinerariesAPI.deleteItinerary(itinerary._id)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* <h1>Itinerary Details Page for {itin.name}</h1>
            <div>Name: {itin.name}</div>
            <div>Destination: {itin.destination}</div>
            <div>Date: {itin.date}</div>
            <hr />   */}
            <h1>Itinerary Details Page for {itinerary.name}</h1>
            <button onClick={handleDelete}>Delete Button</button>
            <h4>Will have all holiday information here in sections</h4>
            <h5>ID - {itinerary._id}</h5>
            <div className="itinerary-sections">
                <div className="itinerary-item">1 - Itinerary - {itinerary.destination}</div>
                <div className="itinerary-item">2 - Budget - {itinerary.budget}</div>
                <div className="itinerary-item">3 - Places to Visit {itinerary.pointsOfInterest}</div>
                <div className="itinerary-item">4 - Restaurants {itinerary.restaurants}</div>
            </div>
        </>
    )
}
