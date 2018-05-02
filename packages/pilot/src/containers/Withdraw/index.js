import React, { Component } from 'react'
import PropTypes from 'prop-types'

class WithdrawContainer extends Component {
  constructor (props) {
    super(props)

    this.teste = this.teste.bind(this)
  }

  teste () {
    console.log(this.props.amount)
  }

  render () {
    console.log(this.props.recipient)
    return (
      <div>
        <p>Amount {this.props.amount}</p>
        <p>Available {this.props.available}</p>
        <p>Current step {this.props.currentStep}</p>
        <p>Date {this.props.date.toISOString()}</p>
        <p>Maximum {this.props.maximum}</p>
        <button onClick={this.props.onChangeRecipient}>Aaa</button>
        <button onClick={this.props.onViewBalance}>Bbb</button>
        <button onClick={this.props.onStepChange}>Change step</button>
        <p>Requested {this.props.requested}</p>
        <p>Status message {this.props.statusMessage}</p>
        <p>Transfer cost {this.props.transferCost}</p>
        <p>Transferred {this.props.transferred}</p>
        <p>{this.props.stepsStatus.data}</p>
        <p>{this.props.stepsStatus.confirmation}</p>
        <p>{this.props.stepsStatus.result}</p>
      </div>
    )
  }
}

WithdrawContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maximum: PropTypes.number.isRequired,
  onChangeRecipient: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  onViewBalance: PropTypes.func.isRequired,
  recipient: PropTypes.shape({}).isRequired,
  requested: PropTypes.number.isRequired,
  statusMessage: PropTypes.string.isRequired,
  stepsStatus: PropTypes.shape({
    data: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    result: PropTypes.oneOf([0, null, undefined]).isRequired,
  }).isRequired,
  transferCost: PropTypes.number.isRequired,
  transferred: PropTypes.number.isRequired,
}

export default WithdrawContainer
