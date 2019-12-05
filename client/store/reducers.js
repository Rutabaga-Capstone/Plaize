import {combineReducers} from 'redux'

import {fakePlants} from './plants'

import {
  SET_PINS,
  ADD_PIN,
  SET_LOCATION,
  SET_REGION,
  SET_PIN_SELECTED,
  CLEAR_PIN_SELECTED,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_PLANTS,
  SET_PLANTS,
  ADD_PLANT
} from './actions' //Import the actions types constant we defined in our actions

let pinsState = {pins: []}
const pinsReducer = (state = pinsState, action) => {
  switch (action.type) {
    case SET_PINS:
      if (action.pins) {
        return {
          ...state,
          pins: action.pins.map(pin => {
            return {
              pin: {
                ...pin,
                title: pin.plants[0].commonName,
                description: pin.plants[0].isPoisonous
                  ? 'Poisonous'
                  : 'Nonpoisonous'
              }
            }
          })
        }
      } else {
        return state
      }
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

let pinSelectedState = {
  pinSelected: {plants: [{commonName: 'hi', isPoisonous: true}]}
}
const pinSelectedReducer = (state = pinSelectedState, action) => {
  switch (action.type) {
    case SET_PIN_SELECTED:
      console.log('action.pinSelected: ', action.pinSelected)
      if (action.pinSelected && action.pinSelected.plants) {
        return {
          ...state,
          pinSelected: {
            ...action.pinSelected,
            title: action.pinSelected.plants[0].commonName,
            description: action.pinSelected.plants[0].isPoisonous
              ? 'Poisonous'
              : 'Nonpoisonous'
          }
        }
      } else {
        return state
      }
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
  }
}

// Combine all the reducers
const rootReducer = combineReducers({
  pinsReducer,
  locationReducer,
  regionReducer,
  pinSelectedReducer,
  modalActionReducer,
  plantsReducer
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer
