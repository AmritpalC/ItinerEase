import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import * as itinerariesAPI from "../../utilities/itineraries-api"
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard"
import './ItinerariesPage.css'
import { Alert, Button, Spinner } from 'reactstrap'

export default function ItinerariesPage() {

    const [itinerariesList, setItinerariesList] = useState([])
    const location = useLocation()
    const message = location.state?.message
    const [messageVisible, setMessageVisible] = useState(false)
    const [alertColor, setAlertColor] = useState("primary") 
    const [loading, setLoading] = useState(true)

    // ? 5 second timer for message when itinerary deleted or created
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

    useEffect(function() {
        async function getItineraries() {
            try {
                const itineraries = await itinerariesAPI.getAllForUser()
                console.log(itineraries)
                setItinerariesList(itineraries)
                setLoading(false)
            }
            catch (err) {
                console.log('Error fetching itineraries ->', err)
            }
        }
        getItineraries()
    }, [])

    return (
        <>
            <div className="itineraries-page-title px-4 my-3">
                <h1>My Holidays</h1>
                <Link to="/itineraries/new" className="add-btn"><h1>+</h1></Link>
            </div>
            {messageVisible && <Alert color={alertColor}><strong>{message}</strong></Alert>}
            <hr />
            {loading ? (
                <Button color="primary" disabled>
                    <Spinner size="sm">
                        Loading...
                    </Spinner>
                    <span>
                        {' '}Loading
                    </span>
                </Button>
            ) : itinerariesList.length > 0 ? (
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
