// import { useState, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as itinerariesAPI from '../../utilities/itineraries-api'
import './NewItineraryPage.css'
import { getUser } from '../../utilities/users-service'

export default function NewItineraryPage({ setRefreshItineraries }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        date: '',
        transport: '',
        accommodation: '',
        user: getUser()._id,
        error: ''
    })

    // useEffect(function() {
    //     async function getItineraries() {
    //         const itineraries = await itinerariesAPI.getAll()
    //         setFormData(itineraries)
    //     }
    //     getItineraries()
    // }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        delete formData.error
        
        try {   
            await itinerariesAPI.createItinerary(formData)
            setRefreshItineraries(true)
            navigate('/itineraries')
        } catch (error) {
            setFormData({ ...formData, error: error.message})
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    
    return (
        <div>
            <h1>New Itinerary</h1>
            <p>Create your new holiday below</p>
            <div className='new-itinerary-form'>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <label>Destination</label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    <label>Transport</label>
                    <input type="text" name="transport" value={formData.transport} onChange={handleChange} />
                    <label>Accomodation</label>
                    <input type="text" name="accommodation" value={formData.accommodation} onChange={handleChange} />
                    <button type="submit">Create Itinerary</button>
                </form>
            </div>
            <p className='error-message'>&nbsp;{formData.error}</p>
        </div>
    )
}
