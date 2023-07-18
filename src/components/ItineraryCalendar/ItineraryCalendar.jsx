import { useState, useEffect } from "react";
import Calendar from "react-calendar"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"

import "./ItineraryCalendar.css"

import * as calendarsAPI from "../../utilities/calendars-api"
import { getUser } from '../../utilities/users-service'
// import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";

export default function ItineraryCalendar({ itinerary }) {

  const [date, setDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [entries, setEntries] = useState([])

  // ? To match my calendarEntry Model
  const [entryData, setEntryData] = useState({
    user: getUser()._id,
    date: new Date(),
    time: "",
    activity: ""
  })

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const [highlightedDates, setHighlightedDates] = useState([])

  useEffect(() => {
    fetchHighlightedDates()
  }, [])

  async function fetchHighlightedDates() {
    try {
      const allDates = await calendarsAPI.getAllCalendarEntries()
      setHighlightedDates(allDates)
    } catch (err) {
      console.log(err)
    }
  }
  
  const getTileClassName = ({ date }) => {
    return highlightedDates.includes(date.toISOString()) ? 'highlighted' : ''
  }

  // ? Markers - markers vs tile colours

  // const getTileContent = ({ date }) => {
  //   return (
  //     highlightedDates.includes(date.toISOString()) && (
  //       <div className="marker">
  //         <span className="dot"></span>
  //       </div>
  //     )
  //   )
  // }

  async function handleEntrySubmit() {
    try {
      await calendarsAPI.createCalendarEntry(entryData)
      console.log('Entry data sent to API ->', entryData)
      setEntryData({
        user: getUser()._id,
        date: date,
        time: "",
        activity: ""
      })
      toggleModal()
      fetchHighlightedDates()
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchEntriesForDay(date) {
    try {
      console.log(date)
      const formattedDate = date.toISOString()
      const entries = await calendarsAPI.getCalendarEntriesForDay(formattedDate)
      setEntries(entries)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDateChange = (selectedDate) => {
    setEntryData({...entryData, date: selectedDate})
    setDate(selectedDate)
    fetchEntriesForDay(selectedDate)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEntryData({...entryData, [name]: value })
  }

    return (
        <>
          <h2>This is the Itinerary Calendar Page for {itinerary.name}</h2>
          <hr />
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={getTileClassName}
            // tileContent={getTileContent}
          />
          <div>Selected date: {date.toDateString()}</div>

          <Button color="primary" onClick={toggleModal}>Add Entry</Button>
          
          <hr />
          <div>Activities planned:</div>
          {entries.length > 0 ? (
            <ul>
              {entries.map((entry) => (
                <li key={entry._id}>
                  Time: {entry.time}, Activity: {entry.activity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities planned for this date</p>
          )}

          <Modal isOpen={showModal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add Entry for {date.toDateString()}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="entryTime">Time</Label>
                <Input type="time" id="entryTime" name="time" value={entryData.time} onChange={handleInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="entryActivity">Activity</Label>
                <Input type="text" id="entryActivity" name="activity" value={entryData.activity} onChange={handleInputChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleEntrySubmit}>Add</Button>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </>
    )
}