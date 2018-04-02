
import { getImageById } from '../../api-sdk/images'
import { INITIALIZE, UPDATE } from './actions'

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
    console.log('done')
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
