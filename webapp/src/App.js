import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {  blueGrey900, blue900} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import Search from './components/Search'
import FlightList from './components/FlightList'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey900,
    primary2Color: blueGrey900,
    primary3Color: blueGrey900,
    accent1Color: blue900,
    accent2Color: blue900,
    accent3Color: blue900,
  },
  appBar: {
    height: 50,
  },
})


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showFilters: false
    }

  }

  handleShowFilters = () => {
    this.setState({
      showFilters: true
    })
  }

  handleHideFilters = () => {
    this.setState({
      showFilters: false
    })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title="Flight App" iconElementRight={
          this.state.showFilters
          ? <IconButton onClick={ this.handleHideFilters }><NavigationClose /></IconButton>
          : <IconButton onClick={ this.handleShowFilters }><SearchIcon /></IconButton>
        } />
        <br/>
          { this.state.showFilters ? <Search /> : null }
        <br/>
        <FlightList />
      </MuiThemeProvider>
    )
  }
}

export default App
