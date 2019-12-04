import {combineReducers} from 'redux'

import {
  SET_PINS,
  ADD_PIN,
  SET_LOCATION,
  SET_REGION,
  SET_PIN_SELECTED,
  CLEAR_PIN_SELECTED,
  OPEN_MODAL,
  CLOSE_MODAL
} from './actions' //Import the actions types constant we defined in our actions

let pinsState = {pins: []}
const pinsReducer = (state = pinsState, action) => {
  switch (action.type) {
    case SET_PINS:
      return {...state, pins: action.pins}
    case ADD_PIN:
      return {...state, pins: [...state.pins, action.pin]}
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

let modalState = {modalAction: {}}
const modalActionReducer = (state = modalState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {...state, modalAction: action.modalAction}
    case CLOSE_MODAL:
      return {...state, modalAction: action.modalAction}
    default:
      return state
  }
}

// Combine all the reducers
const rootReducer = combineReducers({
  pinsReducer,
  locationReducer,
  regionReducer,
  pinSelectedReducer,
  modalActionReducer
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer
