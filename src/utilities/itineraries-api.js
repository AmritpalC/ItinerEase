// network logic 
import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = '/api/itineraries';

export function getAllForUser() {
  return sendRequest(BASE_URL)
}

export function getItinerary(id) {
  return sendRequest(`${BASE_URL}/${id}`)
}

export async function createItinerary(itinerary) {
  return sendRequest(`${BASE_URL}/new`, 'POST', itinerary)
}

export function deleteItinerary(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE', { id })
}