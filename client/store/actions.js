///PINS
export const SET_PINS = 'SET_PINS'

export const setPins = pins => ({
  type: SET_PINS,
  pins
})

export const ADD_PIN = 'ADD_PIN'

export const addPins = pin => ({
  type: ADD_PIN,
  pin
})

///LOCATION
export const SET_LOCATION = 'SET_LOCATION'

export const setLocation = location => ({
  type: SET_LOCATION,
  location
})

///REGION
export const SET_REGION = 'SET_REGION'

export const setRegion = region => ({
  type: SET_REGION,
  region
})

///PIN SELECTED
export const SET_PIN_SELECTED = 'SET_PIN_SELECTED'

export const setPinSelected = pinSelected => ({
  type: SET_PIN_SELECTED,
  pinSelected
})

export const CLEAR_PIN_SELECTED = 'CLEAR_PIN_SELECTED'

export const clearPinSelected = pinSelected => ({
  type: CLEAR_PIN_SELECTED,
  pinSelected
})

///MODAL

export const OPEN_MODAL = 'OPEN_MODAL'

export const openModal = modal => ({
  type: OPEN_MODAL,
  modal
})

export const CLOSE_MODAL = 'CLOSE_MODAL'

export const closeModal = modal => ({
  type: CLOSE_MODAL,
  modal
})

///PLANTS

export const GET_PLANTS = 'GET_PLANTS'
export const SET_PLANTS = 'SET_PLANTS'
export const ADD_PLANT = 'ADD_PLANT'

export const getPlants = () => ({
  type: GET_PLANTS
})

export const setPlants = plants => ({
  type: SET_PLANTS,
  plants
})

export const addPlant = plant => ({
  type: ADD_PLANT,
  plant
})
