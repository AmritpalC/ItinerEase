// network logic 
import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = '/api/itineraries';

export function getAll() {
  return sendRequest(BASE_URL)
}

export function createItinerary(itinerary) {
  return sendRequest(`${BASE_URL}/new`, 'POST', itinerary)
} 