
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './EditItineraryForm.css'
import * as itinerariesAPI from '../../utilities/itineraries-api'

export default function EditItineraryForm({ itinerary, setRefreshItineraries, setMessageVisible,handleFormClose }) {
  // const itineraryDate = new Date(itinerary.date).toLocaleDateString()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: itinerary.name,
    destination: itinerary.destination,
    date: itinerary.date,
    transport: itinerary.transport,
    accommodation: itinerary.accommodation,
  })

  // function formattedDate(dateString) {
  //   const [year, month, day] = dateString.split('T')[0].split('-')
  //   return `${day}/${month}/${year}`
  // }

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData, [e.target.name]: e.target.value 
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {   
        await itinerariesAPI.updateItinerary(itinerary._id, formData)
        setRefreshItineraries(true)
        const urlName = formData.name
        handleFormClose()
        navigate(`/itineraries/${urlName}`, {state: {message: 'Edited Successfully'}})
        setMessageVisible(true)
    } catch (error) {
        setFormData({ ...formData, error: error.message})
    }
  }


  return (
    <div>
      <h1>Edit Itinerary</h1>
      <p>Edit your plan below</p>
      <div className='edit-itinerary-form'>
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
              <button type="submit">Update Itinerary</button>
          </form>
      </div>
    </div>
  )
}