
import React from 'react'

import { Button } from 'former-kit'
import {
  join,
  pipe,
  prop,
  props,
} from 'ramda'

const formatLegalName = pipe(
  prop('bank_account'),
  props(['bank_code', 'legal_name']),
  join(' - ')
)

const getDefaultColumns = onSelect => ([
  {
    accessor: ['id'],
    title: 'recipient',
  },
  {
    accessor: ['bank_account', 'legal_name'],
    title: 'legal_name',
    renderer: formatLegalName,
  },
  {
    accessor: ['bank_account', 'account'],
    title: 'bank',
  },
  {
    accessor: ['bank_account', 'agency'],
    title: 'agency_account',
  },
  {
    align: 'end',
    isAction: true,
    renderer: item => (
      <Button
        fill="outline"
        onClick={() => onSelect(item)}
      >
        {'select'}
      </Button>
    ),
    title: '',
  },
])

export default getDefaultColumns
