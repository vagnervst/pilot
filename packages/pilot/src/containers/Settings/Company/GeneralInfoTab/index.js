import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { CardContent } from 'former-kit'

import ApiKey from './ApiKey'
import Pricing from './Pricing'

const GeneralInfoTab = ({
  apiKeys,
  environment,
  pricing,
  t,
}) => (
  <Fragment>
    <CardContent>
      <Pricing
        pricing={pricing}
        t={t}
      />
    </CardContent>

    <CardContent>
      <ApiKey
        apiKeys={apiKeys}
        environment={environment}
        t={t}
      />
    </CardContent>
  </Fragment>
)

GeneralInfoTab.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    mainTitle: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(PropTypes.shape({
      prices: PropTypes.arrayOf(PropTypes.shape({
        unit: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })).isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

GeneralInfoTab.defaultProps = {
  apiKeys: null,
}

export default GeneralInfoTab
