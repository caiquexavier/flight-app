// Core
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Ui Ux
import { Container, Row, Col } from 'react-grid-system'
import {Card, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSearch from 'material-ui/svg-icons/action/search'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker';

// Actions
import { setFilters } from '../actions/filterActions'
import { fetchFlights } from '../actions/flightActions'

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => {
        dispatch(fetchFlights(filters))
        dispatch(setFilters(filters))
    }
  }
}

export class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialDepartureDate: props.filters.initialDepartureDate,
      initialDepartureTime: props.filters.initialDepartureTime,
      finalDepartureDate: props.filters.finalDepartureDate,
      finalDepartureTime: props.filters.finalDepartureTime,
    }
  }

  handleChangeFlightCode = (event, flightCode) => {
    this.setState({
      flightCode: flightCode,
    })
  }
  handleChangeStatus = (event, status) => {
    this.setState({
      status: status,
    })
  }
  // Departures
  handleInitialDepartureDate = (event, date) => {
    this.setState({
      initialDepartureDate: date,
    })
  }
  handleInitialDepartureTime = (event, time) => {
    this.setState({
      initialDepartureTime: time,
    })
  }
  handleFinalDepartureDate = (event, date) => {
    this.setState({
      finalDepartureDate: date,
    })
  }
  handleFinalDepartureTime = (event, time) => {
    this.setState({
      finalDepartureTime: time,
    })
  }

  render() {
    return (
      <Card>
      <Container>
        <Row align="start">
        <Col sm={6}>
          <TextField floatingLabelText="Flight Code" floatingLabelFixed={true} defaultValue={this.props.filters.flightCode} onChange={this.handleChangeFlightCode}/>
        </Col>
        <Col sm={6}>
          <TextField floatingLabelText="Status" floatingLabelFixed={true} defaultValue={this.props.filters.status} onChange={this.handleChangeStatus}/>
        </Col>
        </Row>
        <Row align="start">
          <Col sm={3}>
          <DatePicker
              onChange={this.handleInitialDepartureDate}
              floatingLabelText="Departure Between"
              defaultDate={ this.props.filters.initialDepartureDate }
            />
          </Col>
          <Col sm={3}>
            <TimePicker
              onChange={this.handleInitialDepartureTime}
              format="24hr"
              floatingLabelText="Time"
              defaultTime={ this.props.filters.initialDepartureTime }
            />
          </Col>
          <Col sm={3}>
          <DatePicker
              onChange={this.handleFinalDepartureDate}
              floatingLabelText="And"
              defaultDate={ this.props.filters.finalDepartureDate }
            />
          </Col>
          <Col sm={3}>
            <TimePicker
              onChange={this.handleFinalDepartureTime}
              format="24hr"
              floatingLabelText="Time"
              defaultTime={ this.props.filters.finalDepartureTime }
            />
          </Col>
        </Row>
        <Row >
            <Col align="end" sm={12}>
                <CardActions>
                  <FloatingActionButton onClick = { () => this.props.setFilters(this.state) }>
                    <ContentSearch />
                  </FloatingActionButton>
                </CardActions>
            </Col>
        </Row>
        </Container>
        </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
