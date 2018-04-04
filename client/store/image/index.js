
import { getImageById } from '../../api-sdk/images'
import { INITIALIZE, UPDATE } from './actions'

// TODO: create an abstraction for these API calls
export const getImage = (dispatch) => async (id) => {
  const queryId = Symbol(id)
  dispatch({
    type: INITIALIZE,
    payload: {
      queryId,
      id
    }
  })

  try {
    const result = await getImageById(id)
    dispatch({
      type: UPDATE,
      payload: {
        queryId,
        result
      }
    })
    return result
  } catch (error) {
    dispatch({
      type: UPDATE,
      payload: {
        queryId,
        error
      }
    })
  }
}
