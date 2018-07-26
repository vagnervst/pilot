import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'former-kit'

import MessageAlert from '../../../components/MessageAlert'

import styles from '../style.css'

const Failure = ({
  onBackToSignup,
  t,
}) => (
  <div className={styles.errorAlert}>
    <MessageAlert
      actionCall={t('sign_up.back_signup_action')}
      icon={
        <Image
          alt="Failure icon"
          fallback={
            <span>
              {t('image_fallback')}
            </span>
          }
          width={167}
        />
      }
      message={
        <span>
          {t('sign_up.error_message')}
        </span>
      }
      onActionClick={onBackToSignup}
      title={
        <h1 className={styles.alertTitle}>
          {t('sign_up.error_title')}
        </h1>
      }
    />
  </div>
)

Failure.propTypes = {
  onBackToSignup: PropTypes.func.isRequired,
  t: PropTypes.func,
}

Failure.defaultProps = {
  t: t => t,
}

export default Failure
