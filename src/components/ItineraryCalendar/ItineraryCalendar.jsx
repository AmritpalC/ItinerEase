import { useState, useEffect } from "react";
import Calendar from "react-calendar"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Badge } from "reactstrap"

import "./ItineraryCalendar.css"

import * as calendarsAPI from "../../utilities/calendars-api"
import { getUser } from '../../utilities/users-service'

export default function ItineraryCalendar({ itinerary }) {

  const [date, setDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [entries, setEntries] = useState([])

  // ? Trying to get calendar to open on itinerary date if it exists, otherwise today
  useEffect(() => {
    if (itinerary) {
      setDate(new Date(itinerary.date))
    } else {
      setDate(new Date())
    }
  }, [itinerary])

  // ? To match my calendarEntry Model
  const [entryData, setEntryData] = useState({
    user: getUser()._id,
    date: new Date(),
    time: "",
    activity: ""
  })

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const toggleKeyModal = () => {
    setShowKeyModal(!showKeyModal)
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
      toggleAddModal()
      fetchHighlightedDates()
      fetchEntriesForDay(date)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleEntryDelete(entryId) {
    try {
      console.log('Deleting entry with ID: ', entryId)
      await calendarsAPI.deleteCalendarEntry(entryId)
      console.log('Entry deleted successfully ->', entryId)
      fetchEntriesForDay(date)
      fetchHighlightedDates()
    } catch (err) {
      console.log('Error deleting entry:', err)
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

  const formattedDate = itinerary ? new Date(itinerary.date) : null
  const holidayDate = formattedDate ? formattedDate.toDateString() : 'no date'

    return (
        <div className="calendar-page">
          {itinerary && (
            <>
              <h1>Itinerary</h1>
              <Badge color="info" className="mb-2">Date: {holidayDate}</Badge>
              <Badge color="primary" className="mb-2 mx-2">Destination: {itinerary.destination}</Badge>
              <Badge color="success" className="mb-2 me-2">Accommodation: {itinerary.accommodation}</Badge>
              <Badge color="secondary" className="mb-2">Transport: {itinerary.transport}</Badge>
              <hr/>
            </>
          )}
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={getTileClassName}
          />
          <div className="my-2"><strong>Selected date:</strong>&nbsp; {date.toDateString()}</div>

          <Button color="primary" id="add-act-btn" onClick={toggleAddModal}>Add Entry</Button>&nbsp;
          <Button color="success" id="key-btn" onClick={toggleKeyModal}>Key</Button>
          
          <hr />
          <div className="mb-2"><strong>Activities planned:</strong></div>
          {entries.length > 0 ? (
            <div className="activities-list">
              {entries.map((entry) => (
                <>
                  <div className="row mx-1" key={entry._id}>
                    <div className="col-2">{entry.time}</div>
                    <div className="col-8">{entry.activity}</div>
                    <button className="col-2 del-act-btn" onClick={() => handleEntryDelete(entry._id)}>X</button>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          ) : (
            <p>No activities planned for this date</p>
          )}

          <Modal isOpen={showAddModal} toggle={toggleAddModal}>
            <ModalHeader toggle={toggleAddModal}>Add Entry for {date.toDateString()}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="entryTime">Time</Label>
                <Input type="time" id="entryTime" name="time" value={entryData.time} onChange={handleInputChange} className="date-input" />
              </FormGroup>
              <FormGroup>
                <Label for="entryActivity">Activity</Label>
                <Input type="text" id="entryActivity" name="activity" value={entryData.activity} onChange={handleInputChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleEntrySubmit}>Add</Button>
              <Button color="secondary" onClick={toggleAddModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={showKeyModal} toggle={toggleKeyModal}>
            <ModalHeader toggle={toggleKeyModal}>Calendar Key</ModalHeader>
            <ModalBody>
              <p><strong className="todays-date">Color 1:</strong> Today's date</p>
              <p><strong className="sel-date">Color 2:</strong> Selected date</p>
              <p><strong className="act-date">Color 3:</strong> Activity planned</p>
            </ModalBody>
            <ModalFooter>
              <Button color="light" onClick={toggleKeyModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
}