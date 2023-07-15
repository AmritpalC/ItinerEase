import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as itinerariesAPI from '../../utilities/itineraries-api'
import './ItineraryDetailPage.css'
// import { useLocation } from 'react-router-dom'

export default function ItineraryDetailPage({ itinerariesList }) {
    // const [itinerariesList, setItinerariesList] = useState([])
    const navigate = useNavigate()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const showConfirmation = () => setDeleteConfirmation(true)
    const hideConfirmation = () => setDeleteConfirmation(false)

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

    async function handleDelete() {
        try {
            await itinerariesAPI.deleteItinerary(itinerary._id)
            navigate('/itineraries')
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
            { deleteConfirmation ?
                <div>
                    <h4>Are you sure you want to delete this itinerary?</h4>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={hideConfirmation}>No</button>
                </div>
                :
                    <>
                    <h1>Itinerary Details Page for {itinerary.name}</h1>
                    <h4>Will have all holiday information here in sections</h4>
                    <h5>ID - {itinerary._id}</h5>
                    <h5>User: { itinerary.user ? itinerary.user : 'no user' }</h5>
                    <div className="itinerary-sections">
                        <div className="itinerary-item">🗓️ - Itinerary - {itinerary.destination}</div>
                        <div className="itinerary-item">£ - Budget - {itinerary.budget}</div>
                        <div className="itinerary-item">🏰 - Places to Visit {itinerary.pointsOfInterest}</div>
                        <div className="itinerary-item">🍱 - Restaurants {itinerary.restaurants}</div>
                    </div>
                    <button onClick={showConfirmation}>Delete Itinerary</button>
                    </>

            // {deleteConfirmation && (
            }
        </>
    )
}
