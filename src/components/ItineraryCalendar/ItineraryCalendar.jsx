import { useState } from "react";
import Calendar from "react-calendar"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"

import "./ItineraryCalendar.css"

import * as calendarsAPI from "../../utilities/calendars-api"
import { getUser } from '../../utilities/users-service'
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";

export default function ItineraryCalendar({ itinerary }) {

  const [date, setDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)

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
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchEntriesForDay(date) {
    try {
      console.log(date)
      // const formattedDate = formatDate(date)
      const formattedDate = date.toISOString()
      const entries = await calendarsAPI.getCalendarEntriesForDay(formattedDate)
      // const entries = await calendarsAPI.getCalendarEntriesForDay(date)
      console.log(entries)
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
          <Calendar onChange={handleDateChange} value={date} />
          <div>Selected date: {date.toDateString()}</div>

          <Button color="primary" onClick={toggleModal}>Add Entry</Button>

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