export const SHOW_TOAST = 'SHOW_TOAST'
export const HIDE_TOAST = 'HIDE_TOAST'

function showToast(text, className) {
  return {
    type: SHOW_TOAST,
    payload: {
      timestamp: Date.now(),
      text,
      className
    }
  }
}

export function hideToast(toast) {
  return {
    type: HIDE_TOAST,
    payload: toast
  }
}

export function showSuccessToast(text) {
  return function(dispatch) {
    const toastAction = showToast(text, 'success')
    dispatch(toastAction)
    setTimeout(() => dispatch(hideToast(toastAction.payload)), 3000)
  }
}

export function showErrorToast(text) {
  return function(dispatch) {
    const toastAction = showToast(text, 'error')
    dispatch(toastAction)
    setTimeout(() => dispatch(hideToast(toastAction.payload)), 3000)
  }
}
