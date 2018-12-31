import { combineReducers } from 'redux'
import signIn from './sign-in'
import apps from './apps'
import users from './users'
import toasts from './toasts'

export default combineReducers({ signIn, apps, users, toasts })
