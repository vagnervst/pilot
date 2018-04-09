import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Transactions from '../Transactions'

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
  configurations: {
    title: 'Configurations',
    path: '/configurations',
    icon: Transaction32,
    subRoute: [
      {
        title: 'general',
        path: '/general',
        component: Transactions,
        icon: Transaction32,
      },
    ],
  },
}
