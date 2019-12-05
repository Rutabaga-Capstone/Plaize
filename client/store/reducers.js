import {combineReducers} from 'redux'

import {fakePlants} from './plants'

import {
  SET_PINS,
  SET_LOCATION,
  SET_REGION,
  SET_PIN_SELECTED,
  CLEAR_PIN_SELECTED,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_PIN,
  GET_PLANTS,
  SET_PLANTS,
  ADD_PLANT,
  GET_USER_DATA,
  SET_USER_DATA,
  UPDATE_USER_DATA_LEAVES
} from './actions' //Import the actions types constant we defined in our actions

let pinsState = {pins: []}
const pinsReducer = (state = pinsState, action) => {
  switch (action.type) {
    case SET_PINS:
      return {...state, pins: [...state.pins, action.pins]}
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

let plantsState = {userPlants: fakePlants}
const plantsReducer = (state = plantsState, action) => {
  switch (action.type) {
    case GET_PLANTS:
      return state
    case SET_PLANTS:
      return {...state, userPlants: [...fakePlants, ...action.plants]}
    case ADD_PLANT:
      return {...state, userPlants: [...fakePlants, action.plant]}
    default:
      return state
  }
}

let userState = {
  user: {
    id: 5,
    name: 'cc',
    email: 'cc',
    password: 'cc',
    leaves: 0,
    regDate: {formatted: '2019-09-24'}
  }
}
const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return state
    case SET_USER_DATA:
      return {...state, userData: action.user}
    case UPDATE_USER_DATA_LEAVES:
      return {...state, userData: {...state.userData, leaves: action.leaves}}
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
  modalActionReducer,
  plantsReducer,
  userReducer
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer
