import { getAccessToken } from './sign-in'
import { AppApi } from '../services'

export const APPS_REQUEST = 'APPS_REQUEST'
export const APPS_SUCCESS = 'APPS_SUCCESS'
export const APPS_ERROR = 'APPS_ERROR'

export const APPS_UPDATE_REQUEST = 'APPS_UPDATE_REQUEST'
export const APPS_UPDATE_SUCCESS = 'APPS_UPDATE_SUCCESS'
export const APPS_UPDATE_ERROR = 'APPS_UPDATE_ERROR'

function appsRequesting() {
  return { type: APPS_REQUEST }
}

function appsSuccess(payload) {
  return { type: APPS_SUCCESS, payload }
}

function appsError() {
  return { type: APPS_ERROR }
}

// export function fetchApps() {
//   return async function(dispatch) {
//     dispatch(appsRequesting())

//     const response = await fetch(
//       'https://guarded-thicket-22918.herokuapp.com/apps',
//       {
//         headers: {
//           Authorization: getAccessToken(),
//           'Content-Type': 'application/json'
//         }
//       }
//     )

//     if (!response.ok) return dispatch(appsError())

//     const { apps } = await response.json()

//     return dispatch(appsSuccess(apps))
//   }
// }

export function fetchApps() {
  return async function(dispatch) {
    dispatch(appsRequesting())
    try {
      const { apps } = await AppApi.list()
      return dispatch(appsSuccess(apps))
    } catch (error) {
      return dispatch(appsError())
    }
  }
}

function appsUpdateRequesting() {
  return { type: APPS_UPDATE_REQUEST }
}

function appsUpdateSuccess(payload) {
  return { type: APPS_UPDATE_SUCCESS, payload }
}

function appsUpdateError() {
  return { type: APPS_UPDATE_ERROR }
}

export function updateApp(appId, name, logo) {
  return async function(dispatch) {
    dispatch(appsUpdateRequesting())
    try {
      const { app } = await AppApi.update({ appId, name, logo })
      return dispatch(appsUpdateSuccess(app))
    } catch (error) {
      return dispatch(appsUpdateError())
    }
  }
}
