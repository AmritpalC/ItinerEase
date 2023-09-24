// network logic 
import sendRequest from "./send-request";
// Base path of the Express route
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

export function updateItinerary(id, itinerary) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', itinerary)
}