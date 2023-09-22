import { useState } from "react";
import "./RemindersList.css";

export default function RemindersList() {

  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <>
      <div>
        Reminders List
      </div>
    </>
  )
}
