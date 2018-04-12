// Core
import axios from 'axios'

const flightsApiUrl = "http://localhost:8081/v1/flights"

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

    dispatch( fetchRequested() )
    axios.get(flightsApiUrl).then( (response) => {

        let flights = response.data._embedded.flights
        dispatch(fetchFullfiled(flights))

    })
    .catch( (err) => {
      dispatch(fetchRejected(err))
    })
  }
}
