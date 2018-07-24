import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  Row,
  Col,
  HeaderTitle,
} from 'former-kit'

import styles from '../style.css'

const InvalidEmailError = ({
  onBackToLogin,
  t,
}) => (
  <div>
    <Grid>
      <Row flex>
        <Col align="center">
          <div className={styles.icon} style={{ backgroundColor: '#ccc' }} />
        </Col>
      </Row>
      <Row flex>
        <Col align="center">
          <HeaderTitle style={{ margin: '0' }}>{t('sign_up.confirmation_emphasis')}</HeaderTitle>
        </Col>
      </Row>
      <Row flex>
        <Col align="center">
          <p>{t('sign_up.confirmation_call')}</p>
        </Col>
      </Row>
      <Row flex>
        <Col align="center">
          <Button
            onClick={onBackToLogin}
            size="huge"
          >
            {t('sign_up.login_action')}
          </Button>
        </Col>
      </Row>
    </Grid>
  </div>
)

InvalidEmailError.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  t: PropTypes.func,
}

InvalidEmailError.defaultProps = {
  t: t => t,
}

export default InvalidEmailError
