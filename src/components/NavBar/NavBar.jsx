import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Toggle from "react-toggle"
import "react-toggle/style.css"

import * as userService from '../../utilities/users-service'
import './NavBar.css'

export default function NavBar({ user, setUser, darkMode, setDarkMode }) {

    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode]) 

    return (
        <nav>
            <span>Welcome, { user.name }&nbsp;<Link to="/"><span>📕</span></Link></span>
            &nbsp; | &nbsp;
            <Link to="/itineraries">Itineraries</Link>
            &nbsp; | &nbsp;
            <Link to="/itineraries/new">New Itinerary</Link>
            &nbsp; | &nbsp;
            <Link to="/calendar">Calendar</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            &nbsp; | &nbsp;
            <Toggle
                className='theme-toggle'
                checked={darkMode}
                onChange={({ target }) => setDarkMode(target.checked)}
                icons={{ checked: "🌙", unchecked: "🔆" }}
            />
        </nav>
    )
}