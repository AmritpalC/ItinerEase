import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
// import { checkToken } from "../../utilities/users-service"
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
    const [alertColor, setAlertColor] = useState("primary") 

    // ? 5 second timer for message when itinerary deleted
    useEffect(() => {
        if (message) {
            setMessageVisible(true)
            setAlertColor(message.includes("Deleted") ? "danger" : "primary")
            const timer = setTimeout(() => {
                setMessageVisible(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    // async function handleCheckToken() {
    //     const expDate = await checkToken()
    //     console.log(expDate)
    // }

    useEffect(function() {
        async function getItineraries() {
            const itineraries = await itinerariesAPI.getAllForUser()
            setItinerariesList(itineraries)
        }
        getItineraries()
    }, [])

    return (
        <>
            <div className="itineraries-page-title">
                <h1>My Holidays</h1>
                <Link to="/itineraries/new" className="add-btn"><h3>+</h3></Link>
            </div>
            {/* <button onClick={handleCheckToken}>Check When My Login Expires</button> */}
            {messageVisible && <Alert color={alertColor}><strong>{message}</strong></Alert>}
            <hr />
            {itinerariesList.length > 0 ? (
                <>
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
