import React from 'react'
import PropTypes from 'prop-types'
import { propOr } from 'ramda'

import {
  Popover,
  PopoverContent,
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconWallet from 'emblematic-icons/svg/Wallet32.svg'

import SidebarSections from '../components/SidebarSections'
import SidebarSummary from '../components/SidebarSummary'
import formatDecimalCurrency from '../formatters/decimalCurrency'

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

  renderSections () {
    const {
      balance,
      onAnticipate,
      onWithdraw,
      t,
    } = this.props

    const available = propOr(null, 'available', balance)
    const waitingFunds = propOr(null, 'waitingFunds', balance)

    return (
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
    )
  }

  render () {
    const {
      collapsed,
      summaryCollapsed,
    } = this.state
    const {
      companyName,
      links,
      logo: Logo,
      onLinkClick,
      t,
    } = this.props

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
            {this.renderSections()}
          </SidebarSummary>
        }

        {collapsed &&
          <Popover
            base="dark"
            content={
              <PopoverContent>
                {this.renderSections()}
              </PopoverContent>
            }
            placement="rightStart"
          >
            <SidebarLinks>
              <SidebarLink
                onClick={() => null} // @TODO: onClick não precisa ser obrigatório
                icon={<IconWallet width={16} height={16} />}
              />
            </SidebarLinks>
          </Popover>
        }

        <SidebarLinks>
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
  onAnticipate: PropTypes.func,
  onWithdraw: PropTypes.func,
  t: PropTypes.func.isRequired,
}

SidebarContainer.defaultProps = {
  companyName: '',
  onAnticipate: null,
  onWithdraw: null,
}

export default SidebarContainer
