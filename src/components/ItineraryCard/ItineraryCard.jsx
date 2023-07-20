import { Link } from "react-router-dom"
import './ItineraryCard.css'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

export default function ItineraryCard({ itinerary }) {
  return (
    // <Link to={{ pathname: `/itineraries/${itinerary.name}`, state: { itinerary } }} className="itinerary-card">
    //   <div className="itinerary-card-details">
    //     <h1>{itinerary.destination} - Itinerary Card</h1>
    //     <p>This card will contain some basic information, such as the title, location and countdown</p>
    //     <p>The card will be a link to the actual itinerary itself. Example of card details:</p>
    //     <div>Holiday name: { itinerary.name }</div>
    //     <div>Destination: { itinerary.destination }</div>
    //     <div>Countdown (days): { itinerary.countdown }</div>
        
    //   </div>
    // </Link>
    <Link to={{ pathname: `/itineraries/${itinerary.name}`, state: { itinerary } }} className="itinerary-card">
      <Card className="my-3 mx-5">
        <CardBody className="itinerary-card-reactstrap">
          <CardTitle tag="h4">
            {itinerary.name}
          </CardTitle>
          <CardSubtitle>
            <strong>Destination:</strong> { itinerary.destination }&nbsp;&nbsp;&nbsp;
            <strong>Countdown (days):</strong> { itinerary.countdown }!
          </CardSubtitle>
          <CardText>
            Sample Text
          </CardText>
        </CardBody>
      </Card>
      {/* <Button color="dark" className="btn">Dark!</Button>
      <Button color="light" className="btn">Light!</Button>
      <Button color="primary" className="btn">Primary!</Button>
      <Button color="success" className="btn">Success!</Button>
      <Button color="danger" className="btn">Danger!</Button>
      <Button color="warning" className="btn">Warning!</Button> */}
    </Link>
  )
}