import { connect } from 'react-redux'
import Toasts from '../components/toasts'

import { hideToast } from '../actions/toasts'

const mapStateToProps = state => ({
  toasts: state.toasts.toasts
})

const mapDispatchToProps = dispatch => ({
  hideToast: toast => dispatch(hideToast(toast))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toasts)
