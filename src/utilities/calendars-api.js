// network logic 
import sendRequest from "./send-request";
// Base path of the Express route
const BASE_URL = '/api/calendars';

export function getAllCalendarEntries() {
  return sendRequest(BASE_URL)
}

export function getCalendarEntriesForDay(date) {
  return sendRequest(`${BASE_URL}/${date}`)
}

export async function createCalendarEntry(entryData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', entryData)
}

export function deleteCalendarEntry(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}