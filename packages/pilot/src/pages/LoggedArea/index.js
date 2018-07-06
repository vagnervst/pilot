import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  applySpec,
  compose,
  path,
} from 'ramda'
import { Layout } from 'former-kit'
import env from '../../environment'

import Sidebar from './Sidebar'
import Header from './Header'

import routes from './routes'

const getRecipientId = path(['account', 'company', 'default_recipient_id', env])
const getBalance = path(['account', 'balance'])
const getCompanyName = path(['account', 'company', 'name'])

const mapStateToProps = applySpec({
  balance: getBalance,
  companyName: getCompanyName,
  recipientId: getRecipientId,
})

const enhanced = compose(
  translate(),
  withRouter,
  connect(mapStateToProps)
)

const LoggedArea = ({
  balance,
  companyName,
  recipientId,
  t,
}) => (
  <Layout
    sidebar={
      <Sidebar
        companyName={companyName}
        balance={balance}
        recipientId={recipientId}
        t={t}
      />
    }
    header={<Header t={t} />}
  >
    <Switch>
      {Object.values(routes).map(({ component, path: pathURI }) => (
        <Route
          key={pathURI}
          path={pathURI}
          component={component}
        />
      ))}
      <Redirect to={routes.transactions.path} />
    </Switch>
  </Layout>
)

LoggedArea.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number,
    waitingFunds: PropTypes.number,
  }),
  companyName: PropTypes.string,
  recipientId: PropTypes.string,
  t: PropTypes.func.isRequired,
}

LoggedArea.defaultProps = {
  balance: {},
  companyName: '',
  recipientId: null,
}

export default enhanced(LoggedArea)
