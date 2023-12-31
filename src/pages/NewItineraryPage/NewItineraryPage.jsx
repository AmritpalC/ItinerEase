// import { useState, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as itinerariesAPI from '../../utilities/itineraries-api'
import './NewItineraryPage.css'

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

    async function handleSubmit(e) {
        e.preventDefault()
        delete formData.error
        
        try {   
            await itinerariesAPI.createItinerary(formData)
            console.log(formData)
            setRefreshItineraries(true)
            navigate('/itineraries', {state: {message: 'Itinerary Created!'}})
        } catch (error) {
            setFormData({ ...formData, error: error.message})
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        
        if (name === 'name' && (value.includes('/') || value.includes('?'))) {
            return
        }
        setFormData({...formData, [name]: value })
    }
    
    return (
        <div className='px-4 my-3'>
            <div className='row'>
                <Link to="/itineraries" className='back-btn col-1'><h3>Back</h3></Link>
                <h1 className='col-10'>New Itinerary</h1>
            </div>
            <p>Create your new holiday below</p>
            <div>
                <form className='new-itinerary-form' onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Required' required />
                    <label>Destination</label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder='Required' required />
                    <label>Date (required)</label>
                    <input type="date" className='date-input' name="date" value={formData.date} onChange={handleChange} required />
                    <label>Transport</label>
                    <input type="text" name="transport" value={formData.transport} onChange={handleChange} />
                    <label>Accommodation</label>
                    <input type="text" name="accommodation" value={formData.accommodation} onChange={handleChange} />
                    <button type="submit" className="create-btn">Create Itinerary</button>
                </form>
            </div>
            <p className='error-message'>&nbsp;{formData.error}</p>
        </div>
    )
}
