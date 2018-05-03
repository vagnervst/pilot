import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Promise from 'bluebird'
import { connect } from 'react-redux'
import {
  equals,
  path,
} from 'ramda'
import WithdrawContainer from '../../containers/Withdraw'

const mapStateToProps = ({
  account: { client },
}) => ({ client })

const enhanced = connect(
  mapStateToProps
)

const steps = [
  {
    data: 'first',
    confirmation: 'First',
    result: 0,
  },
  {
    data: 'second',
    confirmation: 'Second',
    result: 0,
  },
  {
    data: 'third',
    confirmation: 'Third',
    result: 0,
  },
]

const getDefaultRecipient = client => (
  client.company.current()
    .then(path(['default_recipient_id', 'test']))
    .then(id => (
      Promise.props({
        recipientData: client.recipients.find({ id }),
        recipientBalance: client.balance.find({ recipientId: id }),
      })
    ))
)

class Withdraw extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentStep: 0,
      balance: {},
      recipient: {},
      recipients: [],
    }

    this.handleStepChange = this.handleStepChange.bind(this)
    this.getAllRecipients = this.getAllRecipients.bind(this)
    this.setNewRecipient = this.setNewRecipient.bind(this)
  }

  componentDidMount () {
    getDefaultRecipient(this.props.client)
      .then(({ recipientData, recipientBalance }) => (
        this.setState({
          recipient: recipientData,
          balance: recipientBalance,
        })
      ))
  }

  getAllRecipients () {
    // TODO: check if the "recipients" request has pagination!
    this.props.client.recipients.all()
      .then(recipients => this.setState({ recipients }))
  }

  setNewRecipient (newRecipient) {
    if (!equals(newRecipient, this.state.recipient)) {
      this.props.client.balance.find({ recipientId: newRecipient.id })
        .then(balance => (
          this.setState({
            balance,
            recipient: newRecipient,
          })
        ))
    }
  }

  handleStepChange () {
    if (this.state.currentStep < steps.length - 1) {
      this.setState({
        currentStep: this.state.currentStep + 1,
      })
    }
  }

  render () {
    const {
      balance: {
        available,
        transferred,
      },
      currentStep,
      recipient,
      recipients,
    } = this.state

    return (
      <WithdrawContainer
        amount={123}
        available={available ? available.amount : 0}
        currentStep={currentStep}
        date={new Date()}
        maximum={available ? available.amount : 0}
        onChangeRecipient={this.getAllRecipients}
        onSelectNewRecipient={this.setNewRecipient}
        onStepChange={this.handleStepChange}
        onViewBalance={() => {}}
        recipient={recipient}
        recipients={recipients}
        requested={123}
        statusMessage="success"
        stepsStatus={steps[currentStep]}
        transferCost={8523}
        transferred={transferred ? transferred.amount : 0}
      />
    )
  }
}

Withdraw.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default enhanced(Withdraw)
