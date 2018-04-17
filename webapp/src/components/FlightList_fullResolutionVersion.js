// start: Imports
// Core
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Ui Ux
import { Container } from 'react-grid-system'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import {Card } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';
// Formatters
import moment from 'moment';
// Actions
import { fetchFlights, fetchCompleted } from '../actions/flightActions'
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

  renderDetailsDialog () {

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]
    return (
      <Dialog title="Flight Details" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} >
          <span> Flight Code: <b>{this.state.flightDetails.flightCode} </b></span><br/>
          <hr/>
          <span> Departure: <b>{moment(this.state.flightDetails.departureDateTime).format('DD/MM/YYYY hh:mm:ss a')} </b></span><br/>
          <span> Arrival: <b>{moment(this.state.flightDetails.arrivalDateTime).format('DD/MM/YYYY hh:mm:ss a')} </b></span><br/>
          <hr/>
          <span> Airplane Model: <b> {this.state.flightDetails.airplane.airplaneModel} </b></span><br/>
          <span> Airplane Code: <b> {this.state.flightDetails.airplane.airplaneCode} </b></span><br/>
          <hr/>
          <span> Pilot Name: <b> {this.state.flightDetails.pilot.pilotName} </b></span><br/>
          <span> Pilot Identification: <b> {this.state.flightDetails.pilot.pilotDocument} </b></span><br/>
          <hr/>
      </Dialog>
    )
  }

  renderFlights () {

    let flightList = this.props.flights
    if (flightList.length > 0) {

      return flightList.map( (flight, i) => {
        return (<TableRow key={i} selected={this.isSelected(i)}>
                    <TableRowColumn> { flight.flightCode } </TableRowColumn>
                    <TableRowColumn> { flight.airplane.airplaneModel } </TableRowColumn>
                    <TableRowColumn> { moment(flight.departureDateTime).format('DD/MM/YYYY') } </TableRowColumn>
                    <TableRowColumn> { moment(flight.departureDateTime).format('hh:mm:ss a') } </TableRowColumn>
                    <TableRowColumn> { moment(flight.arrivalDateTime).format('DD/MM/YYYY') } </TableRowColumn>
                    <TableRowColumn> { moment(flight.arrivalDateTime).format('hh:mm:ss a') } </TableRowColumn>
                    <TableRowColumn> { flight.status } </TableRowColumn>
                </TableRow>)
      }
    )} else {
      return (<TableRow>
                <TableRowColumn> </TableRowColumn>
                <TableRowColumn> </TableRowColumn>
                <TableRowColumn> { this.renderLoading() }
                </TableRowColumn>
                  <TableRowColumn> </TableRowColumn>
                  <TableRowColumn> </TableRowColumn>
              </TableRow>)
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
      <Container>
      <Snackbar
        open={ (this.props.error !== "") }
        message= { ((this.props.error) ? this.props.error : "Error!") }
        autoHideDuration={4000}
      />
      { this.renderDetailsDialog() }
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader displaySelectAll={this.state.showCheckboxes} selectable = {this.state.selectable} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn>Flight Code</TableHeaderColumn>
            <TableHeaderColumn>Airplane</TableHeaderColumn>
            <TableHeaderColumn>Departure Date</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Arrival Date</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={this.state.deselectOnClickaway} showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows}>
            { this.renderFlights() }
        </TableBody>
      </Table>
      </Container>
      </Card>
     );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightList)
