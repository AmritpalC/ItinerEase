import { useParams } from "react-router-dom"

export default function ItineraryDetailPage({ itineraries }) {
    let { itineraryName } = useParams();
    let itinerary = itineraries.find((iti) => iti.name === itineraryName)

    return (
        <>
            <h1>Itinerary Details Page for {itinerary.name}!</h1>
            <button>Delete Button</button>
            <h4>Will have all holiday information here in sections</h4>
            <div>
                <p>1 - Itinerary - {itinerary.destination}</p>
                <p>2 - Budget - {itinerary.budget}</p>
                <p>3 - Places to Visit {itinerary.pointsOfInterest}</p>
                <p>4 - Restaurants {itinerary.restaurants}</p>
            </div>
        </>
    )
}
