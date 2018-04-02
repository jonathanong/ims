
import {
  INITIALIZE,
  UPDATE
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALIZE:
      return { ...payload }
    case UPDATE: {
      const { queryId } = state
      if (queryId !== payload.queryId) return state
      return { ...state, ...payload }
    }
    default:
      return state
  }
}
