import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientListState from './RecipientList'
import RecipientSelection from './RecipientSelection'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Recipient Selection', () => (
    <RecipientSelection />
  ))
