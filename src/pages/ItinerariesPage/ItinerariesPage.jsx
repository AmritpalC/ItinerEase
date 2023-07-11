import { checkToken } from "../../utilities/users-service"

import ItineraryCard from "../../components/ItineraryCard/ItineraryCard"

export default function ItinerariesPage({ itineraries }) {

    async function handleCheckToken() {
        const expDate = await checkToken()
        console.log(expDate)
    }

    return (
        <>
            <h1>My Holidays</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
            <div>
                {itineraries.map((i, idx) => {
                    return <ItineraryCard itinerary={i} key={idx} />
                })}
            </div>
        </>
    )
}
