import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchApps } from '../actions/apps'
import { showErrorToast, showSuccessToast } from '../actions/toasts'

import Apps from '../components/apps.jsx'

function mapStateToProps(state) {
  const { items, error } = state.apps

  return { error, items }
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchApps: () => dispatch(fetchApps()),
    showSuccessToast: text => dispatch(showSuccessToast(text)),
    showErrorToast: text => dispatch(showErrorToast(text))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Apps)
)
