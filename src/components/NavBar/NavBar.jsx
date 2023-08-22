import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

import * as userService from '../../utilities/users-service'

import logo from '../../assets/plane.png'
import addDark from '../../assets/add-dark.png'
import addLight from '../../assets/add-light.png'
import calendarDark from '../../assets/calendar-dark.png'
import calendarLight from '../../assets/calendar-light.png'
import itinerariesDark from '../../assets/itineraries-dark.png'
import itinerariesLight from '../../assets/itineraries-light.png'
import logOutDark from '../../assets/log-out-dark.png'
import logOutLight from '../../assets/log-out-light.png'

import './NavBar.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap'

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

    const [isOpen, setIsOpen] = useState(false);
      
    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav>
            <span className='welcome-message'>Welcome, { user.name }&nbsp;</span>
            <Link to="/">
                <div className='icon'>
                    <img src={logo} alt="ItinerEase" title="Home" className="nav-logo"/>
                    <span>Home</span>
                </div>
            </Link>
            &nbsp; &nbsp;
            <Link to="/itineraries">
                <div className='icon'>
                    <img src={darkMode ? itinerariesDark : itinerariesLight} alt="Itineraries" title="Itineraries" />
                    <span>Itineraries</span>
                </div>
            </Link>
            &nbsp; &nbsp;
            <Link to="/itineraries/new">
                <div className='icon'>
                    <img src={darkMode ? addDark : addLight} alt="New Itinerary" title="New Itinerary" />
                    <span>New Itinerary</span>
                </div>
            </Link>
            &nbsp; &nbsp;
            <Link to="/calendar">
                <div className='icon'>
                    <img src={darkMode ? calendarDark : calendarLight} alt="Calendar" title="Calendar" />
                    <span>Calendar</span>
                </div>
            </Link>
            &nbsp; &nbsp;
            <Link to="" onClick={handleLogOut}>
                <div className='icon'>
                    <img src={darkMode ? logOutDark : logOutLight} alt="Log Out" title="Log Out" />
                    <span>Log Out</span>
                </div>
            </Link>
            &nbsp; &nbsp;
            <Toggle
                className='theme-toggle'
                checked={darkMode}
                onChange={({ target }) => setDarkMode(target.checked)}
                icons={{ checked: "🌙", unchecked: "🔆" }}
            />
        </nav>

        // <div>
        //     <Navbar className="">
        //     {/* <Navbar className="navbar-dark bg-dark"> */}
        //         <NavbarToggler className="dark" onClick={toggle} />
        //         <NavbarBrand>
        //             Welcome, { user.name }&nbsp;
        //             <Link to="/">
        //                 <img 
        //                     src={logo} 
        //                     alt="ItinerEase" 
        //                     className="nav-logo"
        //                 />
        //             </Link>
        //         </NavbarBrand>
        //         <Toggle
        //             className='theme-toggle'
        //             checked={darkMode}
        //             onChange={({ target }) => setDarkMode(target.checked)}
        //             icons={{ checked: "🌙", unchecked: "🔆" }}
        //         />
        //         <Collapse isOpen={isOpen} navbar>
        //             <Nav className='me-auto' navbar>
        //                 {/* <UncontrolledDropdown nav inNavbar>
        //                     <DropdownToggle nav caret>
        //                         Itineraries
        //                     </DropdownToggle>
        //                     <DropdownMenu>
        //                         <DropdownItem><Link to="/itineraries">My Itineraries</Link></DropdownItem>
        //                         <DropdownItem divider />
        //                         <DropdownItem><Link to="/itineraries/new">New Itinerary</Link></DropdownItem>
        //                     </DropdownMenu>
        //                 </UncontrolledDropdown> */}
        //                 <NavItem>
        //                     <NavLink><Link to="/itineraries">Itineraries</Link></NavLink>
        //                 </NavItem>
        //                 <NavItem>
        //                     <NavLink><Link to="/itineraries/new">New Itinerary</Link></NavLink>
        //                 </NavItem>
        //                 <NavItem>
        //                     <NavLink><Link to="/calendar">Calendar</Link></NavLink>
        //                 </NavItem>
        //                 <NavItem>
        //                     <NavLink><Link to="" onClick={handleLogOut}>Log Out</Link></NavLink>
        //                 </NavItem>
        //             </Nav>
        //         </Collapse>
        //     </Navbar>
        // </div>
    )
}