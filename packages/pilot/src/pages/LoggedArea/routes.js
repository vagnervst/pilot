import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Transactions from '../Transactions'
import Recipients from '../Recipients'

export default {
  recipient: {
    component: Recipients,
    exact: true,
    path: '/recipients',
    title: 'recipient.selection',
  },
  transactions: {
    component: Transactions,
    exact: true,
    icon: Transaction32,
    path: '/transactions',
    title: 'transactions.list',
  },
  transactionsDetails: {
    exact: true,
    path: '/transactions/:id',
    title: 'transactions.details',
  },
}
