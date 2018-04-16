const initialState = {
  filters: {
    flightCode: "",
    status: "",
    initialDepartureDate: new Date(2018, 0, 19, 0, 0, 0),
    initialDepartureTime: new Date(2018, 0, 1, 0, 0, 0),
    finalDepartureDate: new Date(2018, 1, 21, 0, 0, 0),
    finalDepartureTime: new Date(2018, 1, 1, 0, 0, 0),
  }
}

export const filterReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_FILTERS": {
      state = {...state, filters:action.payload}
      break
    }
    default:
  }
  return state
}
