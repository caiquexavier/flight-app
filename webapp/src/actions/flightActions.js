// Core
import axios from 'axios'

const flightsApiUrl = "http://localhost:8081/v1/flights/search/byQueryResults"

export function fetchRequested() {
  let payload = {
    status: "loading"
  }
  return {
    type: "FETCH_REQUESTED",
    payload: payload
  }
}
export function fetchFullfiled(flights) {
  let payload = {
    status: "loading",
    flights: flights
  }
  return {
    type: "FETCH_FULLILED",
    payload: payload
  }
}
export function fetchCompleted() {
  let payload = {
    status: "fetched..."
  }
  return {
    type: "FETCH_COMPLETED",
    payload: payload
  }
}
export function fetchRejected(error) {
  let payload = {
    status: "err",
    errorMessage: error
  }
  return {
    type: "FETCH_REJECTED",
    payload: payload
  }
}


export function fetchFlights(filters) {

  return (dispatch) => {

    let initialDate = new Date(
      filters.initialDepartureDate.getFullYear(),
      filters.initialDepartureDate.getMonth(),
      filters.initialDepartureDate.getDate(),
      filters.initialDepartureTime.getHours(),
      filters.initialDepartureTime.getMinutes(),
      filters.initialDepartureTime.getSeconds(),
    )
    let finalDate = new Date(
      filters.finalDepartureDate.getFullYear(),
      filters.finalDepartureDate.getMonth(),
      filters.finalDepartureDate.getDate(),
      filters.finalDepartureTime.getHours(),
      filters.finalDepartureTime.getMinutes(),
      filters.finalDepartureTime.getSeconds(),
    )

    let params = {
      flightCode: (filters.flightCode) ? filters.flightCode : "",
      status: (filters.status) ? filters.status : "",
      initialDate: initialDate.toISOString(),
      finalDate: finalDate.toISOString()
    }
    // new Date(year, month, day, hours, minutes, seconds, milliseconds)
    dispatch( fetchRequested() )
    axios.get(flightsApiUrl, {params}).then( (response) => {

        let flights = response.data._embedded.flights
        dispatch(fetchFullfiled(flights))

    })
    .catch( (err) => {
      dispatch(fetchRejected(err))
    })
  }
}
