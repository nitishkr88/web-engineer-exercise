import {
  APPS_REQUEST,
  APPS_SUCCESS,
  APPS_ERROR,
  APPS_UPDATE_REQUEST,
  APPS_UPDATE_SUCCESS,
  APPS_UPDATE_ERROR
} from '../actions/apps'

const initialState = {
  requesting: null,
  items: [],
  error: null
}

export default function apps(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case APPS_REQUEST:
    case APPS_UPDATE_REQUEST:
      return {
        ...state,
        requesting: true
      }
    case APPS_SUCCESS:
      return {
        ...state,
        requesting: false,
        items: payload
      }
    case APPS_ERROR:
    case APPS_UPDATE_ERROR:
      return {
        ...state,
        requesting: false,
        error: true
      }
    case APPS_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === payload.id) {
            return payload
          } else {
            return item
          }
        })
      }
    default:
      return state
  }
}
