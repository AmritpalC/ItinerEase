import { Link } from "react-router-dom"
import './ItineraryCard.css'

export default function ItineraryCard({ itinerary }) {
  return (
    <Link to={`/itineraries/${itinerary.name}`}>
      <div className="itinerary-card">
          <h1>{itinerary.destination} - Itinerary Card</h1>
          <p>This card will contain some basic information, such as the title, location and countdown</p>
          <p>The card will be a link to the actual itinerary itself. Example of card details:</p>
          <div>Holiday name: { itinerary.name }</div>
          <div>Destination: { itinerary.destination }</div>
          <div>Countdown (days): { itinerary.countdown }</div>
      </div>
    </Link>
  )
}