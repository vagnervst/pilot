import React from 'react'

import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import RecipientSelection from '../../../src/containers/RecipientSelection'

const recipients = [
  {
    id: 're_ciuvld093j48t4tij3t',
    bank_account: {
      account: '2131322',
      agency: '21312',
      bank_code: '341',
      id: 'ba_ciuv0j420r84f',
      legal_name: 'nome do titular',
      type: 'conta_corrente',
    },
  },
  {
    id: 're_ciuvld093j48t4tij3t',
    bank_account: {
      account: '2131322',
      agency: '21312',
      bank_code: '341',
      id: 'ba_ciuv0j420r84f',
      legal_name: 'nome do titular',
      type: 'conta_corrente',
    },
  },
  {
    id: 're_ciuvld093j48t4tij3t',
    bank_account: {
      account: '2131322',
      agency: '21312',
      bank_code: '341',
      id: 'ba_ciuv0j420r84f',
      legal_name: 'nome do titular',
      type: 'conta_corrente',
    },
  },
  {
    id: 're_ciuvld093j48t4tij3t',
    bank_account: {
      account: '2131322',
      agency: '21312',
      bank_code: '341',
      id: 'ba_ciuv0j420r84f',
      legal_name: 'nome do titular',
      type: 'conta_corrente',
    },
  },
]

const pagination = {
  offset: 1,
  total: 10,
}

const RecipientSelectionExample = () => (
  <Section>
    <RecipientSelection
      onPageChange={action('page-change')}
      onSearch={action('search')}
      onSelect={action('recipient-selection')}
      pagination={pagination}
      recipients={recipients}
      t={t => t}
    />
  </Section>
)

export default RecipientSelectionExample
