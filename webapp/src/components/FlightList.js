// start: Imports
// Core
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Ui Ux
import { Container, Row, Col } from 'react-grid-system'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';
// Formatters
import moment from 'moment';
// Actions
import { fetchFlights, fetchCompleted } from '../actions/flightActions'
// Full Version Resolution Imports
// import FlatButton from 'material-ui/FlatButton'
// import Dialog from 'material-ui/Dialog'
// -- end: Imports

const mapStateToProps = (state) => {
  //console.log("DEBUG -->", state.flight)
  return {
    filters: state.filter.filters,
    flights: state.flight.flights,
    status: state.flight.status,
    error: state.flight.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFlights: (filters) => {
      dispatch(fetchFlights(filters))
    },
    fetchCompleted: () => {
      dispatch(fetchCompleted())
    }
  }
}

class FlightList extends Component {

  constructor(props) {
    super(props)
    moment.locale('br');

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      selected: [],
      open: false,
      flightDetails: {
        airplane: {},
        pilot: {}
      }
    }

  }

  componentWillMount() {
    this.props.fetchFlights(this.props.filters)
  }

  componentDidUpdate(nextProps, nextState) {
    setTimeout(() => {
      this.props.fetchCompleted()
    },
    300)
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1
  }

  handleRowSelection = (selectedRows) => {
    if (selectedRows.length === 0) {
      selectedRows = [0]
    }
    this.setState({
      selected: selectedRows,
      flightDetails: this.props.flights[selectedRows]
    })
    this.handleOpen()
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({
      open: false,
      orderDetails: {}
    })
  }

  renderFlights() {

    let flightList = this.props.flights
    if (flightList.length > 0) {

      return flightList.map( (flight, i) => {
        return (
          <Card key={i}>
            <CardHeader
              title={ flight.flightCode }
              subtitle={ flight.status }
              avatar="./image/flight_icon_new.jpg"
            />
            <CardText>
            <Row align="start">
              <Col sm={6}>
                <h5> Departure Datetime: </h5> { moment(flight.departureDateTime).format('DD/MM/YYYY hh:mm:ss A') }
              </Col>
              <Col sm={6}>
                <h5> Arrival Datetime:  </h5> { moment(flight.arrivalDateTime).format('DD/MM/YYYY hh:mm:ss A') }
              </Col>
            </Row>
            </CardText>
            <CardText>
            <Row align="start">
              <Col sm={6}>
                <Chip>
                  <Avatar src="./image/pilot.jpg" />
                  { flight.pilot.pilotName } - { flight.pilot.pilotDocument }
                </Chip>
              </Col>
              <Col sm={6}>
                <Chip>
                  <Avatar src="./image/airplane_icon.jpg" />
                  { flight.airplane.airplaneModel } - { flight.airplane.airplaneCode }
                </Chip>
              </Col>
            </Row>
            </CardText>
          </Card>
        )
      }
    )} else {
      return (<Card> { this.renderLoading() }  </Card>)
    }
  }


  renderLoading() {

    const style = {
        refresh: {
          display: 'inline-block',
          position: 'relative',
        }
    }

    if (this.props.status === "loading") {
      return (<RefreshIndicator size={40} left={10} top={0} style={style.refresh} status="loading" />)
    } else {
      return (<h5>No Data found!</h5>)
    }

  }

  render() {
    return (
      <Card>
      <Subheader><h3>Next Departures</h3></Subheader>
      <Container>
      <Snackbar
        open={ (this.props.error !== "") }
        message= { ((this.props.error) ? this.props.error : "Error!") }
        autoHideDuration={4000}
      />
      { this.renderFlights() }
      </Container>
      </Card>
     );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightList)
