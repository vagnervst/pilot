import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Col,
  Grid,
  Row,
} from 'former-kit'

const MessageAlert = ({
  actionCall,
  icon,
  message,
  onActionClick,
  title,
}) => (
  <Grid>
    <Row flex>
      <Col align="center">
        {icon}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {title}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {message}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        <Button
          fill="gradient"
          onClick={onActionClick}
        >
          {actionCall}
        </Button>
      </Col>
    </Row>
  </Grid>
)

MessageAlert.propTypes = {
  actionCall: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
  onActionClick: PropTypes.func,
}

MessageAlert.defaultProps = {
  onActionClick: () => {},
}

export default MessageAlert
