import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Transactions from '../Transactions'
import Withdraw from '../Withdraw'

export default {
  transactions: {
    title: 'transactions.list',
    path: '/transactions',
    component: Transactions,
    icon: Transaction32,
    exact: true,
  },
  transactionsDetails: {
    title: 'transactions.details',
    path: '/transactions/:id',
    exact: true,
  },
  withdraw: {
    component: Withdraw,
    exact: true,
    icon: Transaction32,
    path: '/withdraw',
    title: 'Saque',
  },
}
