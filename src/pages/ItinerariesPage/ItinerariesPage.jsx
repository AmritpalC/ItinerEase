import { useState, useEffect } from "react"
import { checkToken } from "../../utilities/users-service"
import * as itinerariesAPI from "../../utilities/itineraries-api"
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard"
import ItineraryDetailPage from "../ItineraryDetailPage/ItineraryDetailPage"
import './ItinerariesPage.css'

export default function ItinerariesPage({ itineraries }) {

    const [itinerariesList, setItinerariesList] = useState([])
    const [selectedItinerary, setSelectedItinerary] = useState(null)
    const [showDetailPage, setShowDetailPage] = useState(false)

    async function handleCheckToken() {
        const expDate = await checkToken()
        console.log(expDate)
    }

    useEffect(function() {
        async function getItineraries() {
            const itineraries = await itinerariesAPI.getAll()
            setItinerariesList(itineraries)
        }
        getItineraries()
    }, [])

    function handleItineraryCardClick(itinerary) {
        setSelectedItinerary(itinerary)
        setShowDetailPage(true)
    }

    function handleBackToItineraries() {
        setSelectedItinerary(null)
        setShowDetailPage(false)
    }

    if (showDetailPage) {
        return (
            <ItineraryDetailPage 
                itinerary={selectedItinerary}
                onBack={handleBackToItineraries}        
            />
        )
    }

    return (
        <>
            <h1>My Holidays</h1>
            <div className="itineraries-page-list">
                {itinerariesList.map((i, idx) => {
                    return <ItineraryCard itinerary={i} key={idx} onClick={() => handleItineraryCardClick(i)} />
                })}
            </div>
            <hr />
            <h1>My Holidays</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
            <div className="itineraries-page-list">
                {itineraries.map((i, idx) => {
                    return <ItineraryCard itinerary={i} key={idx} />
                })}
            </div>
        </>
    )
}