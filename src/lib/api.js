import querystring from 'querystring'

import appConfig from '../app-config'
import { getAccessToken } from '../actions/sign-in'

function generateHeader(useToken) {
  let headers = new Headers()
  headers.append('Accept', 'application/json')
  if (useToken) {
    headers.append('Authorization', getAccessToken())
  }
  return headers
}

const makeMethod = (method, hasBody) => (
  urlTemplate,
  baseUrl = appConfig.BASE_URL
) => (data, useToken = true) => {
  let url = baseUrl + urlTemplate
  data = { ...data }
  for (let tag of url.match(/:[a-zA-Z]+/g) || []) {
    let value = data[tag.slice(1)]
    if (value === undefined) {
      console.warn('Warning: calling', method, 'without', tag)
      value = ''
    }
    url = url.replace(tag, encodeURIComponent(data[tag.slice(1)]))
    delete data[tag.slice(1)]
  }

  let headers = generateHeader(useToken)
  // let headers = generateHeader(data.cfg, useToken)
  // if (data.cfg) {
  //   delete data.cfg
  // }

  let body
  if (hasBody) {
    headers.append('Content-Type', 'application/json')
    body = JSON.stringify(data)
  } else {
    let qs = querystring.stringify(data)
    if (qs) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + qs
    }
  }

  return new Promise((resolve, reject) => {
    const init = {
      method,
      headers,
      body,
      mode: 'cors'
    }

    return fetch(url, init)
      .then(response => {
        if (response.ok) return response
        reject(response)
      })
      .then(response => response.json())
      .then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

export const GET = makeMethod('GET')
export const DELETE = makeMethod('DELETE', true)
export const POST = makeMethod('POST', true)
export const PUT = makeMethod('PUT', true)
