import './App.css'
import { useState } from 'react'

// Router
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

// Custom Components
import AuthPage from '../AuthPage/AuthPage'
import ItinerariesPage from '../ItinerariesPage/ItinerariesPage'
import NewItineraryPage from '../NewItineraryPage/NewItineraryPage'
import CalendarPage from '../CalendarPage/CalendarPage'
import NavBar from '../../components/NavBar/NavBar'

// Test data
import { itineraries } from '../../data'
import ItineraryDetailPage from '../ItineraryDetailPage/ItineraryDetailPage'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [darkMode, setDarkMode] = useState(true)

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
              <Route 
                path="/itineraries" 
                element={<ItinerariesPage 
                itineraries={itineraries} />} 
              />
              <Route 
                path="/itineraries/:itineraryName" 
                element={<ItineraryDetailPage 
                itineraries={itineraries} />} 
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