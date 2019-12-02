import {combineReducers} from 'redux'

import {
  SET_PINS,
  SET_LOCATION,
  SET_REGION,
  SET_PIN_SELECTED,
  CLEAR_PIN_SELECTED
} from './actions' //Import the actions types constant we defined in our actions

let pinsState = {pins: []}
const pinsReducer = (state = pinsState, action) => {
  switch (action.type) {
    case SET_PINS:
      return {...state, pins: action.pins}
    default:
      return state
  }
}

let locationState = {location: {}}
const locationReducer = (state = locationState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, location: action.location}
    default:
      return state
  }
}

let regionState = {region: {}}
const regionReducer = (state = regionState, action) => {
  switch (action.type) {
    case SET_REGION:
      return {...state, region: action.region}
    default:
      return state
  }
}

let pinSelectedState = {pinSelected: {}}
const pinSelectedReducer = (state = pinSelectedState, action) => {
  switch (action.type) {
    case SET_PIN_SELECTED:
      return {...state, pinSelected: action.pinSelected}
    case CLEAR_PIN_SELECTED:
      return {...state, pinSelected: action.pinSelected}
    default:
      return state
  }
}

// Combine all the reducers
const rootReducer = combineReducers({
  pinsReducer,
  locationReducer,
  regionReducer,
  pinSelectedReducer
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer
