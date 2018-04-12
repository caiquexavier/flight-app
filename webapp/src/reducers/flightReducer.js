const initialState = {
  status: "ready",
  error: "",
  flights:[]
}

export const flightReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUESTED":
        state = {...state, status: action.payload.status}
        break
    case "FETCH_FULLILED":
      state = {...state, flights: action.payload.flights, status: action.payload.status}
      break
    case "FETCH_COMPLETED":
        state = {...state, status: action.payload.status}
        break
    case "FETCH_REJECTED":
        state = {...state, status: action.payload.status, error: action.payload.error}
        break
    default:
  }
  return state
}
