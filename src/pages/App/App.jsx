import './App.css'
import { useState } from 'react'

// Router
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

// Custom Components
import AuthPage from '../AuthPage/AuthPage'
import ItineraryHistoryPage from '../ItineraryHistoryPage/ItineraryHistoryPage'
import NewItineraryPage from '../NewItineraryPage/NewItineraryPage'
import CalendarPage from '../CalendarPage/CalendarPage'
import NavBar from '../../components/NavBar/NavBar'

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/itineraries/new" element={<NewItineraryPage />} />
              <Route path="/itineraries" element={<ItineraryHistoryPage />} />
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