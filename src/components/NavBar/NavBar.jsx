import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    return (
        <nav>
            <Link to="/itineraries">Itineraries</Link>
            &nbsp; | &nbsp;
            <Link to="/itineraries/new">New Itinerary</Link>
            &nbsp; | &nbsp;
            <Link to="/calendar">Calendar</Link>
            &nbsp; | &nbsp;
            <span>Welcome, { user.name }</span>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}