import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Alert } from 'reactstrap'

import * as itinerariesAPI from '../../utilities/itineraries-api'

import EditItineraryForm from '../../components/EditItineraryForm/EditItineraryForm'

import BudgetTable from '../../components/BudgetTable/BudgetTable'
// import PlacesToVisitList from '../../components/PlacesToVisitList/PlacesToVisitList'
import RestaurantList from '../../components/RestaurantsList/RestaurantsList'
import ItineraryCalendar from '../../components/ItineraryCalendar/ItineraryCalendar'
import RemindersList from '../../components/RemindersList/RemindersList'

import coins from '../../assets/coins.png'
import reminderDark from '../../assets/reminder-dark.png'
import reminderLight from '../../assets/reminder-light.png'
import landmarkDark from '../../assets/landmark-dark.png'
import landmarkLight from '../../assets/landmark-light.png'
import pizzaDark from '../../assets/pizza-dark.png'
import pizzaLight from '../../assets/pizza-light.png'
import calendarDark from '../../assets/calendar-dark.png'
import calendarLight from '../../assets/calendar-light.png'

import './ItineraryDetailPage.css'


export default function ItineraryDetailPage({ itinerariesList, setRefreshItineraries, darkMode }) {
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
    const [loading, setLoading] = useState(true)

    const handleGoBack = () => {navigate('/itineraries')}

    const [selectedComponent, setSelectedComponent] = useState(null)
    const handleComponentClick = (componentName) => {setSelectedComponent(componentName)}
    
    const renderComponent = () => {
        if (selectedComponent === 'itinerary') {
            return <ItineraryCalendar itinerary={itinerary} />
        } else if (selectedComponent === 'budget') {
            return <BudgetTable itinerary={itinerary} setRefreshItineraries={setRefreshItineraries} />
        // } else if (selectedComponent === 'places') {
        //     return <PlacesToVisitList itinerary={itinerary} />
        } else if (selectedComponent === 'restaurants') {
            return <RestaurantList itinerary={itinerary} />
        } else if (selectedComponent === 'reminders') {
            return <RemindersList itinerary={itinerary} setRefreshItineraries={setRefreshItineraries} />
        }
        return null
    }

    // ? 5 second timer for message when itinerary edited
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
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <h4>Are you sure you want to delete this itinerary?</h4>
                    <button onClick={handleDelete} className='mx-3 px-3 btn-b-radius'>Yes</button>
                    <button onClick={hideConfirmation} className='mx-3 px-3 btn-b-radius'>No</button>
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
                    <h1 className='px-4 mt-3'>Itinerary for {itinerary.name}</h1>
                    {!selectedComponent && (
                        <>
                            {messageVisible && message && <Alert className="message"><strong>{message}</strong></Alert>}
                            <h5>Date: {holidayDate}</h5>
                            <h5>Countdown (days): {itinerary.countdown}!</h5>
                        </>
                    )}
                    {selectedComponent && (
                        <>
                            <button className='back-to-iti-btn' onClick={() => setSelectedComponent(null)}>Back to Itinerary</button>
                        </>
                    )}
                    <hr/>
                    {selectedComponent ? (
                        renderComponent()
                    ) : (
                        <div className="itinerary-sections px-4 my-3">
                            <div className="itinerary-item" onClick={() => handleComponentClick('itinerary')}>
                                <img src={darkMode ? calendarDark : calendarLight} alt="Itinerary" title="Itinerary" className='img-fluid' />                               
                                <span>&nbsp;Itinerary</span>
                            </div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('budget')}>
                                <img src={coins} alt="Budget" title="Budget" className='img-fluid' />                               
                                <span>&nbsp;&nbsp;Budget</span>
                            </div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('restaurants')}>
                                <img src={darkMode ? landmarkDark : landmarkLight} alt="Places to Visit" title="Places to Visit" className='img-fluid' />                               
                                <span className='p-t-visit'>Places to Visit</span>
                                <img src={darkMode ? pizzaDark : pizzaLight} alt="Places to Visit" title="Restaurants" className='img-fluid' />
                            </div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('reminders')}>
                                <img src={darkMode ? reminderDark : reminderLight} alt="Reminders" title="Reminders" className='img-fluid' />                               
                                <span>Reminders</span>
                            </div>
                        </div>
                    )}

                    {!selectedComponent && (
                        <>
                            <Button className="mx-1" id="go-back-btn" onClick={handleGoBack}>Back to itineraries</Button>
                            <Button className="mx-1" id='edit-btn' onClick={handleEdit}>Edit Itinerary</Button>
                            <Button className="mx-1" id='del-btn' onClick={showConfirmation}>Delete Itinerary</Button>
                        </>
                    )}
                </>
            )}
        </>
    )
}
