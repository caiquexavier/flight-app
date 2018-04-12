import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {  red900, green50} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import Search from './components/Search'
import FlightList from './components/FlightList'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red900,
    primary2Color: red900,
    primary3Color: red900,
    accent1Color: red900,
    accent2Color: green50,
    accent3Color: red900,
  },
  appBar: {
    height: 50,
  },
})


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title=""/>
        <br/>
        <br/>
        <FlightList />
      </MuiThemeProvider>
    )
  }
}

export default App
