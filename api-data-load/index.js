const axios  = require('axios')

const flightsApiUrl = "http://localhost:8081/v1/flights"
const flights = require('./flights.json')

function loadData() {
  flights.forEach( (flight) => {

    axios.post(flightsApiUrl, flight)
    .then(function (response) {
      console.log("loadFlightResponse =>", response.data)
    })
    .catch(function (error) {
      console.log(error)
    })

  })
}

loadData();
