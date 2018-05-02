import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import Withdraw from '../../../src/containers/Withdraw'
import Section from '../../Section'

const recipient = {
  object: 'recipient',
  id: 're_cixm61j7e00doin6de8ocgttb',
  transfer_enabled: true,
  last_transfer: null,
  transfer_interval: 'weekly',
  transfer_day: 5,
  automatic_anticipation_enabled: true,
  automatic_anticipation_type: 'full',
  automatic_anticipation_days: null,
  automatic_anticipation_1025_delay: 0,
  anticipatable_volume_percentage: 85,
  date_created: '2017-01-06T18:59:35.936Z',
  date_updated: '2017-01-06T18:59:35.936Z',
  postback_url: 'https://requestb.in/tl0092tl',
  status: 'active',
  status_reason: null,
  bank_account: {
    object: 'bank_account',
    id: 17365090,
    bank_code: '341',
    agencia: '0932',
    agencia_dv: '5',
    conta: '58054',
    conta_dv: '1',
    type: 'conta_corrente',
    document_type: 'cpf',
    document_number: '26268738888',
    legal_name: 'API BANK ACCOUNT',
    charge_transfer_fees: true,
    date_created: '2017-01-06T18:52:22.215Z',
  },
}

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
]

class WithdrawState extends Component {
  constructor () {
    super()

    this.state = {
      step: 0,
    }

    this.handleStepChange = this.handleStepChange.bind(this)
  }

  handleStepChange () {
    if (this.state.step < steps.length - 1) {
      this.setState({
        step: this.state.step + 1,
      })
    }
  }

  render () {
    return (
      <Section>
        <Withdraw
          amount={123}
          available={123456}
          currentStep={this.state.step}
          date={new Date()}
          maximum={74120}
          onChangeRecipient={action('change recipient')}
          onStepChange={this.handleStepChange}
          onViewBalance={action('view balance')}
          recipient={recipient}
          requested={123}
          statusMessage="success"
          stepsStatus={steps[this.state.step]}
          transferCost={8523}
          transferred={7410}
        />
      </Section>
    )
  }
}


export default WithdrawState
