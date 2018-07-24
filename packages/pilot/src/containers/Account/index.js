import React from 'react'
import PropTypes from 'prop-types'

import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from 'former-kit'

import styles from './style.css'

const Account = ({
  t,
  base,
  logo: Logo,
  primaryContent,
  secondaryContent,
}) => (
  <Landing className={styles.container}>
    <LandingPrimarySection base={base}>
      <div className={styles.columnContainer}>
        <div className={styles.logo}>
          <Logo alt={t('landing.logo')} width="160px" height="47px" />
        </div>
        {primaryContent}
      </div>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <div className={styles.columnContainer}>
        {secondaryContent}
      </div>
    </LandingSecondarySection>
  </Landing>
)

Account.propTypes = {
  base: PropTypes.string,
  logo: PropTypes.func.isRequired,
  primaryContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
  t: PropTypes.func,
}

Account.defaultProps = {
  base: 'dark',
  t: t => t,
}

export default Account
