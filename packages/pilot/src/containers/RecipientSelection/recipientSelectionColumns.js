import React, { Fragment } from 'react'
import {
  last,
  isNil,
  head,
  ifElse,
  pipe,
  prop,
  props,
  join,
}
  from 'ramda'

const getAgencyProps = pipe(
  prop('bank_account'),
  props(['agencia', 'agencia_dv'])
)

const getAccountProps = pipe(
  prop('bank_account'),
  props(['conta', 'conta_dv'])
)
const joinProps = ifElse(
  pipe(
    last,
    isNil
  ),
  head,
  join('-')
)

const formatAgency = pipe(
  getAgencyProps,
  joinProps
)

const formatAccount = pipe(
  getAccountProps,
  joinProps
)

const rendererAgencyAccount = t => (item) => {
  const agency = t('agency', { number: formatAgency(item) })
  const account = t('account', { number: formatAccount(item) })

  return (
    <Fragment>
      <span>{agency}</span>
      <span>{account}</span>
    </Fragment>
  )
}

const rendererBank = t => (item) => {
  const { bank_account: { bank_code: bankCode } } = item
  const bankCodeKey = `bank_code.${bankCode}`
  return `${bankCode} - ${t(bankCodeKey)}`
}

const getDefaultColumns = (t, renderSelectColumn) => ([
  {
    accessor: ['id'],
    title: 'recipient',
  },
  {
    accessor: ['bank_account', 'legal_name'],
    title: 'legal_name',
  },
  {
    accessor: ['bank_account', 'bank_code'],
    title: 'bank',
    renderer: rendererBank(t),
  },
  {
    accessor: ['bank_account', 'agency'],
    title: 'agency_account',
    renderer: rendererAgencyAccount(t),
  },
  {
    align: 'end',
    isAction: true,
    renderer: renderSelectColumn,
    title: '',
  },
])

export default getDefaultColumns
