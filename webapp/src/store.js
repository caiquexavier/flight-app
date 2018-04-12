// Core
import { applyMiddleware, createStore, combineReducers } from 'redux'
// import { logger }   from 'redux-logger'
import { flightReducer } from './reducers/flightReducer'
import { filterReducer } from './reducers/filterReducer'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

export default createStore(
  combineReducers({
    filter: filterReducer,
    flight: flightReducer
  }),
  middleware
)
