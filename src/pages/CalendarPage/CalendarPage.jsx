import Calendar from "react-calendar"
import ItineraryCalendar from "../../components/ItineraryCalendar/ItineraryCalendar"

export default function CalendarPage() {

    return (
        <>
            {/* <h1>CalendarPage</h1>
            <button>Calendar Button</button>
            <input type="text" />
            <hr />
            <Calendar /> */}
            <h1 className="my-3">Calendar</h1>
            <hr />
            <ItineraryCalendar />
        </>
    )
}
