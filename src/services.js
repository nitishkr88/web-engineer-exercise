import { POST, GET, PUT } from './lib/api'

export const AuthApi = {
  authenticate: POST('/login')
}

export const AppApi = {
  list: GET('/apps'),
  update: PUT('/apps/:appId')
}

export const UserApi = {
  listInitial: GET('/apps/:appId/users'),
  list: GET('/apps/:appId/users?limit=:limit&offset=:offset')
}
