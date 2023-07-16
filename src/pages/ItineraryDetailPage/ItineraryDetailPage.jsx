import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import * as itinerariesAPI from '../../utilities/itineraries-api'

import EditItineraryForm from '../../components/EditItineraryForm/EditItineraryForm'

import BudgetTable from '../../components/BudgetTable/BudgetTable'
import PlacesToVisitList from '../../components/PlacesToVisitList/PlacesToVisitList'
import RestaurantList from '../../components/RestaurantsList/RestaurantsList'
import ItineraryList from '../../components/ItineraryList/ItineraryList'

import './ItineraryDetailPage.css'

export default function ItineraryDetailPage({ itinerariesList, setRefreshItineraries }) {
    // const [itinerariesList, setItinerariesList] = useState([])
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

    // const [showBudgetTable, setShowBudgetTable] = useState(false)
    // function toggleBudgetTable() {
    //     setShowBudgetTable((prevShowBudgetTable) => !prevShowBudgetTable)
    // }

    const [selectedComponent, setSelectedComponent] = useState(null)
    const handleComponentClick = (componentName) => {setSelectedComponent(componentName)}
    
    const renderComponent = () => {
        if (selectedComponent === 'itinerary') {
            return <ItineraryList itinerary={itinerary} />
        } else if (selectedComponent === 'budget') {
            return <BudgetTable itinerary={itinerary} />
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

    // useEffect(function() {
    //     async function getItineraries() {
    //         const itineraries = await itinerariesAPI.getAllForUser()
    //         setItinerariesList(itineraries)
    //     }
    //     getItineraries()
    // }, [])

    let { itineraryName } = useParams();
    let itinerary = itinerariesList.find((i) => i.name === itineraryName)

    if (!itinerary) {
        return <div>Itinerary not found</div>
    }
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
            navigate('/itineraries', { state: { message: 'Itinerary Deleted'}})
            // setMessageVisible(true)
        } catch (err) {
            console.log(err)
        }
    }

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
                    <h4>Will have all holiday information here in sections</h4>
                    {messageVisible && message && <div className="message">{message}</div>}
                    <h5>ID - {itinerary._id}</h5>
                    <h5>User: { itinerary.user ? itinerary.user : 'no user' }</h5>
                    <h5>Date: { itinerary.date ? itinerary.date : 'no date' }</h5>
                    {selectedComponent ? (
                        renderComponent()
                    ) : (
                    //     <div>
                    //         <BudgetTable itinerary={itinerary} />
                    //         <button onClick={toggleBudgetTable}>Toggle Budget Table</button>
                    //     </div>
                    // ) : (
                        <div className="itinerary-sections">
                            <div className="itinerary-item" onClick={() => handleComponentClick('itinerary')}>🗓️ - Itinerary - {itinerary.destination}</div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('budget')}>
                                💷 - Budget 
                                {/* <button onClick={toggleBudgetTable}>Toggle Budget Table</button>
                                {showBudgetTable && <BudgetTable itinerary={itinerary} />} */}
                            </div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('places')}>🏰 - Places to Visit {itinerary.pointsOfInterest}</div>
                            <div className="itinerary-item" onClick={() => handleComponentClick('restaurants')}>🍱 - Restaurants {itinerary.restaurants}</div>
                        </div>
                    )}

                    { selectedComponent && (
                        <button onClick={() => setSelectedComponent(null)}>Back to Itinerary</button>
                    )}

                    {/* <div className="itinerary-sections">
                        <Link
                            className='itinerary-item'
                            to={{
                                pathname: `/itineraries/${itineraryName}/itinerary`,
                                state: { itinerary }
                            }}
                        >
                            🗓️ - Itinerary
                        </Link>
                        <Link 
                            className='itinerary-item' 
                            to={{
                                pathname: `/itineraries/${itineraryName}/budget`,
                                state: { itinerary }
                            }}
                        >
                            💷 - Budget
                        </Link>
                        <Link 
                            className='itinerary-item' 
                            to={{
                                pathname: `/itineraries/${itineraryName}/places`,
                                state: { itinerary }
                            }}
                        >
                            🏰 - Places to Visit
                        </Link>
                        <Link
                            className='itinerary-item'
                            to={{
                                pathname: `/itineraries/${itineraryName}/restaurants`,
                                state: { itinerary }
                            }}
                        >
                            🍱 - Restaurants
                        </Link>
                    </div> */}
                    {!selectedComponent && (
                        <>
                            <button onClick={showConfirmation}>Delete Itinerary</button>
                            <button onClick={handleEdit}>Edit Itinerary</button>
                        </>
                    )}
                </>
            )}
        </>
    )
}
