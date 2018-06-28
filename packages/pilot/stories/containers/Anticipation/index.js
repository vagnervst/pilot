import React, { Component } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import {
  always,
  cond,
  equals,
  last,
  pipe,
  split,
} from 'ramda'
import Anticipation from '../../../src/containers/Anticipation'
import Section from '../../Section'

const stepsStatus = {
  data: 'current',
  confirmation: 'pending',
  result: 'pending',
}

const recipient = {
  bank_account: {
    agencia: '0932',
    agencia_dv: '5',
    bank_code: '341',
    charge_transfer_fees: true,
    conta: '58054',
    conta_dv: '1',
    date_created: '2017-01-06T18:52:22.215Z',
    document_number: '26268738888',
    document_type: 'cpf',
    id: 17365090,
    legal_name: 'API BANK ACCOUNT',
    object: 'bank_account',
    type: 'conta_corrente',
  },
  date_created: '2017-01-06T18:59:35.936Z',
  id: 're_cixm61j7e00doin6de8ocgttb',
  last_transfer: null,
  object: 'recipient',
  transfer_enabled: true,
}

const transferCost = -3214

class AnticipationExample extends Component {
  constructor () {
    super()

    this.state = {
      currentStep: 'data',
      error: '',
      requested: '0',
      stepsStatus,
    }

    this.goTo = this.goTo.bind(this)
  }

  goTo (nextStep, nextStepStatus = 'current') {
    const buildStepsStatus = cond([
      [
        equals('data'),
        always({
          data: nextStepStatus,
          confirmation: 'pending',
          result: 'pending',
        }),
      ],
      [
        equals('confirmation'),
        always({
          data: 'success',
          confirmation: nextStepStatus,
          result: 'pending',
        }),
      ],
      [
        equals('result'),
        always({
          data: 'success',
          confirmation: 'success',
          result: nextStepStatus,
        }),
      ],
    ])

    this.setState({
      currentStep: nextStep,
      stepsStatus: buildStepsStatus(nextStep),
    })
  }

  render () {
    return (
      <Section>
        <Anticipation
          amount={Number(this.state.requested) + transferCost}
          automaticTransfer
          currentStep={this.state.currentStep}
          date={moment()}
          error={null}
          loading={false}
          onCancel={() => this.goTo('confirmation')}
          onConfirmationConfirm={() => this.goTo('result', 'success')}
          onConfirmationReturn={() => this.goTo('data')}
          onDataConfirm={() => this.goTo('confirmation')}
          onViewAnticipation={action('See Anticipation')}
          onTryAgain={action('Try again')}
          recipient={recipient}
          requested={Number(this.state.requested)}
          statusMessage="Success!!!!"
          stepsStatus={this.state.stepsStatus}
          t={t => t}
          timeframe="end"
          totalCost={123}
        />
      </Section>
    )
  }
}

export default AnticipationExample
