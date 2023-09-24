import { Link } from "react-router-dom"
import './ItineraryCard.css'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'

export default function ItineraryCard({ itinerary }) {

  const formattedDate = itinerary.date ? new Date(itinerary.date) : null
  const holidayDate = formattedDate ? formattedDate.toDateString() : 'no date'

  return (
    <Link to={{ pathname: `/itineraries/${itinerary.name}`, state: { itinerary } }} className="itinerary-card">
      <Card className="my-4 col-10 offset-1">
        <CardBody className="itinerary-card-reactstrap">
          <CardTitle tag="h4">
            {itinerary.name}
          </CardTitle>
          <CardSubtitle>
            <strong>Date:</strong> { holidayDate }
          </CardSubtitle>
          <CardText>
            <strong>Destination:</strong> { itinerary.destination } &nbsp;&nbsp;&nbsp;
            <strong>Countdown:</strong> { itinerary.countdown }!
          </CardText>
        </CardBody>
      </Card>
    </Link>
  )
}