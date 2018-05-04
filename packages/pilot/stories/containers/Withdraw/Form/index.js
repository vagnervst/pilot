import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import WithdrawForm from '../../../../src/containers/Withdraw/Form'
import Section from '../../../Section'

class WithdrawFormState extends Component {
  constructor () {
    super()

    this.state = {
      requested: 0,
      amount: 0,
    }

    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  handleAmountChange (requested, amount) {
    this.setState({
      requested,
      amount,
    })
  }

  render () {
    return (
      <Section>
        <WithdrawForm
          amount={this.state.amount}
          available={123456}
          date={new Date()}
          maximum={12345}
          onAmountChange={this.handleAmountChange}
          onCancel={action('Cancel')}
          onSubmit={action('Submit')}
          requested={this.state.requested}
          transferCost={-3214}
        />
      </Section>
    )
  }
}


export default WithdrawFormState
