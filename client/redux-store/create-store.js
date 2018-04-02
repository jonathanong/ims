
import { createStore } from 'redux'

import reducers from './reducers'

export default (initialState = {}) => {
  return createStore(reducers, initialState)
}
