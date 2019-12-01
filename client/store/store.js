import devToolsEnhancer from 'remote-redux-devtools' //redux store debugger
import {createStore} from 'redux'

import reducers from './reducers.js' //Import the reducer

// Connect our store to the reducers
export default createStore(reducers, devToolsEnhancer())
