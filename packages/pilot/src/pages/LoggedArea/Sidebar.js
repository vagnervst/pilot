import React from 'react'
import PropTypes from 'prop-types'
import {
  head,
  pipe,
  split,
  values,
} from 'ramda'

import { withRouter } from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../logo.svg'

const removeRouteParams = pipe(
  split(':'),
  head
)

const Sidebar = ({
  balance,
  companyName,
  history,
  location: { pathname },
  recipientId,
  t,
}) => (
  <SidebarContainer
    balance={balance}
    companyName={companyName}
    links={values(routes)
      .filter(({ hidden }) => !hidden)
      .map(route => ({
        ...route,
        active: pathname.includes(removeRouteParams(route.path)),
      }))
    }
    logo={Logo}
    onAnticipate={() => history.push(`/anticipation/${recipientId}`)}
    onLinkClick={history.push}
    onWithdraw={() => history.push(`/withdraw/${recipientId}`)}
    t={t}
  />
)

Sidebar.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number,
    waitingFunds: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  recipientId: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

Sidebar.defaultProps = {
  companyName: '',
  recipientId: null,
}

export default withRouter(Sidebar)
