import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientListState from './RecipientList'
import Withdraw from './Withdraw'
import WithdrawForm from './Withdraw/Form'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Withdraw', () => (
    <Withdraw />
  ))
  .add('WithdrawForm', () => (
    <WithdrawForm />
  ))
