import React, { Component } from 'react'
import PropTypes from 'prop-types'

class WithdrawContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showRecipients: false,
    }

    this.handleChangeRecipient = this.handleChangeRecipient.bind(this)
    this.handleSelectNewRecipient = this.handleSelectNewRecipient.bind(this)
  }

  handleChangeRecipient () {
    if (this.state.showRecipients) {
      this.setState({
        showRecipients: false,
      })
    } else {
      this.setState({
        showRecipients: true,
      })

      this.props.onChangeRecipient()
    }
  }

  handleSelectNewRecipient (recipient) {
    this.props.onSelectNewRecipient(recipient)

    this.setState({
      showRecipients: false,
    })
  }

  render () {
    return (
      <div>
        <p>Amount {this.props.amount}</p>
        <p>Id {this.props.recipient.id}</p>
        <p>Available {this.props.available}</p>
        <p>Current step {this.props.currentStep}</p>
        <p>Date {this.props.date.toISOString()}</p>
        <p>Maximum {this.props.maximum}</p>
        <button onClick={this.props.onViewBalance}>Bbb</button>
        <button onClick={this.props.onStepChange}>Change step</button>
        <p>Requested {this.props.requested}</p>
        <p>Status message {this.props.statusMessage}</p>
        <p>Transfer cost {this.props.transferCost}</p>
        <p>Transferred {this.props.transferred}</p>
        <p>{this.props.stepsStatus.data}</p>
        <p>{this.props.stepsStatus.confirmation}</p>
        <p>{this.props.stepsStatus.result}</p>

        <button onClick={this.handleChangeRecipient}>Aaa</button>

        {this.state.showRecipients &&
          <div>
            {this.props.recipients.map(re => (
              <button
                key={re.id}
                onClick={() => this.handleSelectNewRecipient(re)}
              >
                {re.id}
              </button>
            ))}
          </div>
        }
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
  onSelectNewRecipient: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  onViewBalance: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  recipients: PropTypes.arrayOf(PropTypes.shape({})),
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

WithdrawContainer.defaultProps = {
  recipients: [],
}

export default WithdrawContainer
