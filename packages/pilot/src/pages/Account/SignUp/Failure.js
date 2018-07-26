import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { SignupFailure } from '../../../containers/Account/SignUp'

const enhanced = compose(
  translate(),
  withRouter
)

class SignUpFailurePage extends PureComponent {
  constructor (props) {
    super(props)

    this.handleBackToSignup = this.handleBackToSignup.bind(this)
  }

  handleBackToSignup () {
    this.props.history.replace('/account/signup')
  }

  render () {
    return (
      <SignupFailure
        onBackToSignup={this.handleBackToSignup}
        t={this.props.t}
      />
    )
  }
}

SignUpFailurePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(SignUpFailurePage)
