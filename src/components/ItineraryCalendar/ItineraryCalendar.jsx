import { useState } from "react";
import Calendar from "react-calendar"

// import './ItineraryCalendar.css'

export default function ItineraryCalendar({ itinerary }) {

  const [date, setDate] = useState(new Date())

    return (
        <>
          <h2>This is the Itinerary Calendar Page for {itinerary.name}</h2>
          <button>Calendar Button</button>
          <hr />
          <Calendar onChange={setDate} value={date} />
          <div>Selected date: {date.toDateString()}</div>
        </>
    )
}