import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import ErrorIcon from './ErrorIcon.svg'
import MessageAlert from '../../../src/components/MessageAlert'

const MessageAlertExample = () => (
  <Section>
    <MessageAlert
      actionCall="Action!"
      icon={<ErrorIcon />}
      title={
        <h1 style={{ margin: 0 }}>
          Alert!
        </h1>
      }
      message={
        <span>Error Message</span>
      }
      onActionClick={action('onActionClick')}
    />
  </Section>
)

export default MessageAlertExample
