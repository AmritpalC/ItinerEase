import './HomePage.css'
import logo from '../../assets/logo.png'
import { Card, CardImg } from 'reactstrap'

export default function HomePage() {
  return (
    <>
      <h1>ItinerEase</h1>
      <CardImg src={logo} alt="ItinerEase" className="img-fluid home-logo"/>
      <h4>Holiday Planning Made Easy</h4>
      <p>ItinerEase is your all-in-one travel planning companion. 
        Effortlessly create, track, and manage itineraries for your trips. 
        Stay organized, manage your budget, and discover exciting places 
        and restaurants. Simplify your travel planning with ItinerEase.</p>
    </>
  )
}