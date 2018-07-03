/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { propOr } from 'ramda'

import SidebarSections from '../components/SidebarSections'
import SidebarSummary from '../components/SidebarSummary'
import formatDecimalCurrency from '../formatters/decimalCurrency'

import {
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconWallet from 'emblematic-icons/svg/Wallet32.svg'

class SidebarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      summaryCollapsed: true,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  render () {
    const {
      collapsed,
      summaryCollapsed,
    } = this.state
    const {
      balance,
      companyName,
      links,
      logo: Logo,
      onAnticipate,
      onLinkClick,
      onWithdraw,
      t,
    } = this.props

    const available = propOr(null, 'available', balance)
    const waitingFunds = propOr(null, 'waitingFunds', balance)
    
    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && <Logo width="140" />}
          <button onClick={this.handleToggleSidebar}>
            <IconMenu width={16} height={16} />
          </button>
        </SidebarHeader>

        {!collapsed &&
          <SidebarSummary
            collapsed={summaryCollapsed}
            onClick={() => this.setState({ summaryCollapsed: !summaryCollapsed })}
            subtitle={
              summaryCollapsed
                ? t('pages.sidebar.show_balance')
                : t('pages.sidebar.hide_balance')
            }
            title={companyName}
          >
            <SidebarSections
              sections={[
                {
                  action: onWithdraw,
                  actionTitle: t('pages.sidebar.withdraw'),
                  title: t('pages.sidebar.available'),
                  value: <span><small>{t('pages.sidebar.currency_symbol')}</small> {formatDecimalCurrency(available)}</span>,
                },
                {
                  action: onAnticipate,
                  actionTitle: t('pages.sidebar.anticipation'),
                  title: t('pages.sidebar.waiting_funds'),
                  value: <span><small>{t('pages.sidebar.currency_symbol')}</small> {formatDecimalCurrency(waitingFunds)}</span>,
                },
              ]}
            />
          </SidebarSummary>
        }

        <SidebarLinks>
          {collapsed &&
            <SidebarLink
              icon={<IconWallet width={16} height={16} />}
            />
          }

          {links.map(({
            active,
            icon: Icon,
            path,
            title,
          }) => (
            <SidebarLink
              key={path}
              title={t(title)}
              active={active}
              icon={<Icon width={16} height={16} />}
              collapsed={collapsed}
              onClick={() => onLinkClick(path)}
            />
          )
        )}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

SidebarContainer.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number,
    waitingFunds: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    title: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.func,
    component: PropTypes.func,
  })).isRequired,
  logo: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SidebarContainer.defaultProps = {
  companyName: '',
}

export default SidebarContainer
