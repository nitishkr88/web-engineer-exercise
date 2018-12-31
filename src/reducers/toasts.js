import { SHOW_TOAST, HIDE_TOAST } from '../actions/toasts'

const initialState = {
  toasts: []
}

export default function toasts(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SHOW_TOAST:
      return {
        ...state, // Not needed, but still
        toasts: [...state.toasts, payload]
      }
    case HIDE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(
          toast => toast.timestamp !== payload.timestamp
        )
      }
    default:
      return state
  }
}
