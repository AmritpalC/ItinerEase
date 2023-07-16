import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
// import { Link, useParams } from "react-router-dom"
import { checkToken } from "../../utilities/users-service"
import * as itinerariesAPI from "../../utilities/itineraries-api"
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard"
// import ItineraryDetailPage from "../ItineraryDetailPage/ItineraryDetailPage"
import './ItinerariesPage.css'

export default function ItinerariesPage() {

    const [itinerariesList, setItinerariesList] = useState([])
    // const [selectedItinerary, setSelectedItinerary] = useState(null)
    // const [showDetailPage, setShowDetailPage] = useState(false)
    const location = useLocation()
    const message = location.state?.message
    const [messageVisible, setMessageVisible] = useState(false)

    // // ? 3 second timer for message when itinerary deleted
    useEffect(() => {
        if (message) {
            setMessageVisible(true)
            const timer = setTimeout(() => {
                setMessageVisible(false)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [message])

    async function handleCheckToken() {
        const expDate = await checkToken()
        console.log(expDate)
    }

    useEffect(function() {
        async function getItineraries() {
            const itineraries = await itinerariesAPI.getAllForUser()
            setItinerariesList(itineraries)
        }
        getItineraries()
    }, [])

    // function handleItineraryCardClick(itinerary) {
    //     setSelectedItinerary(itinerary)
    //     setShowDetailPage(true)
    // }

    // function handleBackToItineraries() {
    //     setSelectedItinerary(null)
    //     setShowDetailPage(false)
    // }

    // if (showDetailPage) {
    //     return (
    //         <ItineraryDetailPage 
    //             itinerary={selectedItinerary}
    //             onBack={handleBackToItineraries}        
    //         />
    //     )
    // }

    return (
        <>
            <h1>My Holidays</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
            {messageVisible && <div className="message">{message}</div>}
            {/* {messageVisible && <div>{message? message : ''}</div>} */}
            <hr />
            {itinerariesList.length > 0 ? (
                <>
                    <h1>My Holidays</h1>
                    <div className="itineraries-page-list">
                        {itinerariesList.map((i, idx) => {
                            return <ItineraryCard itinerary={i} key={idx} />
                            // return <Link to={`/itineraries/${i.name}`} key={idx}>
                            //             <ItineraryCard itinerary={i} />
                            //         </Link>
                            // return <ItineraryCard itinerary={i} key={idx} onClick={() => handleItineraryCardClick(i)} />
                        })}
                    </div>
                </>
            ) : (
                <div>Create a new itinerary to get started! 😁</div>
            )}
        </>
    )
}
