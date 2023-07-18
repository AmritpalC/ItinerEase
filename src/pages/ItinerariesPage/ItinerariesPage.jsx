import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
// import { Link, useParams } from "react-router-dom"
import { checkToken } from "../../utilities/users-service"
import * as itinerariesAPI from "../../utilities/itineraries-api"
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard"
// import ItineraryDetailPage from "../ItineraryDetailPage/ItineraryDetailPage"
import './ItinerariesPage.css'
import { Alert } from 'reactstrap'

export default function ItinerariesPage() {

    const [itinerariesList, setItinerariesList] = useState([])
    const location = useLocation()
    const message = location.state?.message
    const [messageVisible, setMessageVisible] = useState(false)

    // ? 3 second timer for message when itinerary deleted
    useEffect(() => {
        if (message) {
            setMessageVisible(true)
            const timer = setTimeout(() => {
                setMessageVisible(false)
            }, 5000)
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

    return (
        <>
            <h1>My Holidays</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
            {messageVisible && <Alert color="primary">{message}</Alert>}
            <hr />
            {itinerariesList.length > 0 ? (
                <>
                    <h1>My Holidays</h1>
                    <div className="itineraries-page-list">
                        {itinerariesList.map((i, idx) => {
                            return <ItineraryCard itinerary={i} key={idx} />
                        })}
                    </div>
                </>
            ) : (
                <div>Create a new itinerary to get started! 😁</div>
            )}
        </>
    )
}
