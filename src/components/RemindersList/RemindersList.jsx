import { useState, useEffect } from "react";
import { Input, Label, Badge } from 'reactstrap'
import "./RemindersList.css";
import * as itinerariesAPI from "../../utilities/itineraries-api"

export default function RemindersList( { itinerary, setRefreshItineraries }) {

  const [reminderItems, setReminderItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newDate, setNewDate] = useState('')

  useEffect(() => {
    setReminderItems(itinerary.reminders)
  }, [itinerary.reminders])
  
  async function handleAddItem() {
    if (newItem) {
      const newReminderItem = { name: newItem, date: newDate, completed: false}
      const updatedItems = [...reminderItems, newReminderItem]
      setReminderItems(updatedItems)
      setNewItem('')
      setNewDate('')
      await itinerariesAPI.updateItinerary(itinerary._id, { reminders: updatedItems })
      setRefreshItineraries(true)
    }
  }
  
  async function handleRemoveItem(index) {
    const updatedItems = [...reminderItems]
    updatedItems.splice(index, 1)
    setReminderItems(updatedItems)
    await itinerariesAPI.updateItinerary(itinerary._id, { reminders: updatedItems })
    setRefreshItineraries(true)
  }

  async function handleCheckboxChange(index) {
    const updatedItems = [...reminderItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    setReminderItems(updatedItems);
    await itinerariesAPI.updateItinerary(itinerary._id, { reminders: updatedItems });
    setRefreshItineraries(true);
  }


  return (
    <div className="reminders-page">
        <h1>Reminder List</h1>
        <div className="mb-2">Add reminders and optionally a date</div>
        <div>
          <input
            className="reminder-input ms-1"
            type="text"
            placeholder="New Reminder"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <input
            className="reminder-date date-input mx-2"
            type="date"
            value={newDate ? newDate : ''}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button className="reminder-add-btn me-1" type="submit" onClick={handleAddItem}>Add</button>
        </div>
        <hr/>
        <ul className="reminders-list pt-3 px-2">
          {reminderItems.map((item, index) => (
            <>
              <li key={item._id} className="row to-do-item">
                <span className="col-2">
                  <Input 
                    type="checkbox"
                    className="checkbox"
                    id={`checkbox-${item._id}`}
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </span>
                <span className="col-4">
                  <Label htmlFor={`checkbox-${item._id}`}>{item.name}</Label>
                </span>
                <span className="col-4">
                  <Label>{item.date ? new Date(item.date).toLocaleDateString() : ''}</Label>
                </span>
                <span className="col-2">
                  <Badge pill id="del-to-do-btn" onClick={() => handleRemoveItem(index)}><strong>X</strong></Badge>
                </span>
              </li>
              <hr/>
            </>
          ))}
        </ul>
    </div>
  )
}