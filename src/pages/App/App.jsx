import './App.css'
import { useState, useEffect } from 'react'

// Router
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

// Custom Components
import HomePage from '../HomePage/HomePage'
import ItinerariesPage from '../ItinerariesPage/ItinerariesPage'
import NewItineraryPage from '../NewItineraryPage/NewItineraryPage'
import CalendarPage from '../CalendarPage/CalendarPage'
import NavBar from '../../components/NavBar/NavBar'

import ItineraryDetailPage from '../ItineraryDetailPage/ItineraryDetailPage'

// ? Actual Data
import * as itinerariesAPI from '../../utilities/itineraries-api'

export default function App() {
  const [user, setUser] = useState(getUser())
  const [darkMode, setDarkMode] = useState(true)
  const [itinerariesList, setItinerariesList] = useState([])
  const [refreshItineraries, setRefreshItineraries] = useState(false)

  useEffect(() => {
    if (user){
      getItineraries()
    }
  }, [user])

  useEffect(() => {
    if (refreshItineraries) {
      getItineraries()
      setRefreshItineraries(false)
    }
  }, [refreshItineraries])

  async function getItineraries() {
    try {
      const itineraries = await itinerariesAPI.getAllForUser()
      setItinerariesList(itineraries)
    } catch (err) {
      console.log('Error fetching itineraries:', err)
    }
  }

  return (
    <main className="App">
      { user ?
        <>
          <NavBar
            user={user} setUser={setUser}
            darkMode={darkMode} setDarkMode={setDarkMode} 
          />
          <Routes>
            <Route 
              path="/" 
              element={<HomePage user={user} setUser={setUser} />} 
            />
            <Route 
              path="/itineraries" 
              element={<ItinerariesPage />} 
            />
            <Route 
              path="/itineraries/:itineraryName" 
              element={<ItineraryDetailPage itinerariesList={itinerariesList} setRefreshItineraries={setRefreshItineraries} darkMode={darkMode} />} 
            />
            <Route path="/itineraries/new" element={<NewItineraryPage setRefreshItineraries={setRefreshItineraries} />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </>
        :
        <HomePage setUser={setUser} />
      }
    </main>
  );
}