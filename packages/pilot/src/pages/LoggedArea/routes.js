import Balance32 from 'emblematic-icons/svg/Extract32.svg'
import Configuration32 from 'emblematic-icons/svg/Configuration32.svg'
import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Withdraw32 from 'emblematic-icons/svg/Withdraw32.svg'
// import Store32 from 'emblematic-icons/svg/Store32.svg'

import { Balance } from '../Balance'
import CompanySettings from '../CompanySettings'
import Transactions from '../Transactions'
import UserSettings from '../UserSettings'
import Withdraw from '../Withdraw'
import Recipients from '../Recipients'

export default {
  balance: {
    component: Balance,
    icon: Balance32,
    exact: true,
    path: '/balance/:id?',
    title: 'pages.balance.title',
  },
  transactions: {
    title: 'pages.transactions.title',
    path: '/transactions',
    component: Transactions,
    icon: Transaction32,
    exact: true,
  },
  transactionsDetails: {
    title: 'pages.transaction.title',
    path: '/transactions/:id',
    exact: true,
    hidden: true,
  },
  withdrawRoot: {
    component: Withdraw,
    icon: Withdraw32,
    path: '/withdraw',
    title: 'pages.withdraw.title',
  },
  withdraw: {
    hidden: true,
    path: '/withdraw/:id?',
  },
  accountSettings: {
    title: 'pages.settings.user.menu',
    path: '/account/settings',
    component: UserSettings,
    icon: Configuration32,
    exact: true,
    hidden: true,
  },
  companySettings: {
    title: 'pages.settings.company.menu',
    path: '/settings',
    component: CompanySettings,
    icon: Configuration32,
    exact: true,
  },
  recipients: {
    title: 'pages.recipients.title',
    path: '/recipients',
    component: Recipients,
    icon: Transaction32,
    exact: true,
  },
}
