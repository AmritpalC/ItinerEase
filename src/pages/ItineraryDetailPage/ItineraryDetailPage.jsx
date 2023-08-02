import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import * as itinerariesAPI from '../../utilities/itineraries-api'

import EditItineraryForm from '../../components/EditItineraryForm/EditItineraryForm'

import BudgetTable from '../../components/BudgetTable/BudgetTable'
import PlacesToVisitList from '../../components/PlacesToVisitList/PlacesToVisitList'
import RestaurantList from '../../components/RestaurantsList/RestaurantsList'
import ItineraryCalendar from '../../components/ItineraryCalendar/ItineraryCalendar'

import './ItineraryDetailPage.css'
import { Button, Alert } from 'reactstrap'

export default function ItineraryDetailPage({ itinerariesList, setRefreshItineraries }) {
    const navigate = useNavigate()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const showConfirmation = () => setDeleteConfirmation(true)
    const hideConfirmation = () => setDeleteConfirmation(false)

    const [showEditForm, setShowEditForm] = useState(false)
    const handleEdit = () => setShowEditForm(true)
    const handleFormClose = () => setShowEditForm(false)

    const location = useLocation()
    const message = location.state?.message

    const [messageVisible, setMessageVisible] = useState(false)

    const handleGoBack = () => {navigate('/itineraries')}

    const [selectedComponent, setSelectedComponent] = useState(null)
    const handleComponentClick = (componentName) => {setSelectedComponent(componentName)}
    
    const renderComponent = () => {
        if (selectedComponent === 'itinerary') {
            return <ItineraryCalendar itinerary={itinerary} />
        } else if (selectedComponent === 'budget') {
            return <BudgetTable itinerary={itinerary} setRefreshItineraries={setRefreshItineraries} />
        } else if (selectedComponent === 'places') {
            return <PlacesToVisitList itinerary={itinerary} />
        } else if (selectedComponent === 'restaurants') {
            return <RestaurantList itinerary={itinerary} />
        }
        return null
    }

    // ? 3 second timer for message when itinerary deleted
    useEffect(() => {
        if (messageVisible) {
            const timer = setTimeout(() => {
                setMessageVisible(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [messageVisible])

    let { itineraryName } = useParams();
    let itinerary = itinerariesList.find((i) => i.name === itineraryName)

    if (!itinerary) {
        return <div>Itinerary not found</div>
    }

    async function handleDelete() {
        try {
            await itinerariesAPI.deleteItinerary(itinerary._id)
            navigate('/itineraries', { state: { message: 'Itinerary Deleted'}})
            // setMessageVisible(true)
        } catch (err) {
            console.log(err)
        }
    }

    const formattedDate = itinerary.date ? new Date(itinerary.date) : null
    const holidayDate = formattedDate ? formattedDate.toDateString() : 'no date'

    return (
        <>
            {deleteConfirmation ? (
                <div>
                    <h4>Are you sure you want to delete this itinerary?</h4>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={hideConfirmation}>No</button>
                </div>
            ) : showEditForm ? (
                <EditItineraryForm 
                    itinerary={itinerary} 
                    setRefreshItineraries={setRefreshItineraries} 
                    handleFormClose={handleFormClose}
                    setMessageVisible={setMessageVisible} 
                    onClose={handleFormClose} />
            ) : (
                <>
                    <h1>Itinerary Details Page for {itinerary.name}</h1>
                    {!selectedComponent && (
                        <>
                            {/* <h4>Will have all holiday information here in sections</h4> */}
                            {messageVisible && message && <Alert className="message"><strong>{message}</strong></Alert>}
                            {/* <h5>ID - {itinerary._id}</h5>
                            <h5>User: { itinerary.user ? itinerary.user : 'no user' }</h5> */}
                            {/* <h5>Date: { itinerary.date ? itinerary.date : 'no date' }</h5> */}
                            <h5>Date: {holidayDate}</h5>
                            <h5>Countdown (days): {itinerary.countdown}!</h5>
                        </>
                    )}
                    <hr/>
                    { selectedComponent && (
                        <button onClick={() => setSelectedComponent(null)}>Back to Itinerary</button>
                    )}

                    {selectedComponent ? (
                        renderComponent()
                    ) : (
                        <div className="itinerary-sections my-3">
                            <div className="itinerary-item" onClick={() => handleComponentClick('itinerary')}>🗓️ - Itinerary - {itinerary.destination}</div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('budget')}>💷 - Budget</div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('places')}>🏰 - Places to Visit {itinerary.pointsOfInterest}</div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('restaurants')}>🍱 - Restaurants {itinerary.restaurants}</div>
                        </div>
                    )}

                    {/* { selectedComponent && (
                        <button onClick={() => setSelectedComponent(null)}>Back to Itinerary</button>
                    )} */}

                    {!selectedComponent && (
                        <>
                            <Button color="success" className="go-back-btn" onClick={handleGoBack}>Back to all Itineraries</Button>
                            <Button color="primary" className="mx-2" onClick={handleEdit}>Edit Itinerary</Button>
                            <Button color="warning" onClick={showConfirmation}>Delete Itinerary</Button>
                        </>
                    )}
                </>
            )}
        </>
    )
}
