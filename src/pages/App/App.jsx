import './App.css'
import { useState, useEffect } from 'react'

// Router
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

// Custom Components
import AuthPage from '../AuthPage/AuthPage'
import ItinerariesPage from '../ItinerariesPage/ItinerariesPage'
import NewItineraryPage from '../NewItineraryPage/NewItineraryPage'
import CalendarPage from '../CalendarPage/CalendarPage'
import NavBar from '../../components/NavBar/NavBar'
import ItineraryDetailPage from '../ItineraryDetailPage/ItineraryDetailPage'

// Test data
// import { itineraries } from '../../data'

// ? Actual Data
import * as itinerariesAPI from '../../utilities/itineraries-api'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [darkMode, setDarkMode] = useState(true)
  const [itinerariesList, setItinerariesList] = useState([])

  useEffect(function() {
      async function getItineraries() {
          const itineraries = await itinerariesAPI.getAllForUser()
          setItinerariesList(itineraries)
      }
      getItineraries()
  }, [])

  return (
    <main className="App">
      { user ?
          <>
            <NavBar
              user={user} setUser={setUser}
              darkMode={darkMode} setDarkMode={setDarkMode} 
            />
            <hr/>
            <Routes>
              {/* <Route 
                path="/itineraries" 
                element={<ItinerariesPage 
                itineraries={itineraries} />} 
              /> */}
              {/* <Route 
                path="/itineraries/:itineraryName" 
                element={<ItineraryDetailPage 
                itineraries={itineraries} />} 
              /> */}
              <Route 
                path="/itineraries" 
                element={<ItinerariesPage itinerariesList={itinerariesList}/>} 
              />
              <Route 
                path="/itineraries/:itineraryName" 
                element={<ItineraryDetailPage itinerariesList={itinerariesList} />} 
              />
              <Route path="/itineraries/new" element={<NewItineraryPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to="/itineraries" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}