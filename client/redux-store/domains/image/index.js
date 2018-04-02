
import { getImageById } from '../../../api-sdk/images'

export const INITIALIZE = Symbol('INITIALIZE')
export const UPDATE = Symbol('UPDATE')

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
