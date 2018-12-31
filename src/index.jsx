import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'

import SignIn from './containers/sign-in.jsx'
import Apps from './containers/Apps.jsx'
import Users from './containers/Users.jsx'

import rootReducer from './reducers/root-reducer'
import Toasts from './containers/toasts'

import './styles/index.css'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancer)

// if (module.hot) {
//   console.log('module is hot')
//   module.hot.accept()
// }

ReactDOM.render(
  <Provider store={store}>
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/apps" component={Apps} />
          <Route path="/apps/:id" component={Users} />
        </Switch>
      </Router>
      <Toasts />
    </>
  </Provider>,
  document.getElementById('app')
)
