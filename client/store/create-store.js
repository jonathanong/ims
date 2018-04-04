
import { createStore } from 'redux'

import reducers from './reducers'

export default (initialState: Object|void = {}): Object => {
  return createStore(reducers, initialState)
}
