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
  relevance,
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
          relevance={relevance}
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
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  message: PropTypes.element.isRequired,
  onActionClick: PropTypes.func,
}

MessageAlert.defaultProps = {
  relevance: 'normal',
  onActionClick: () => {},
}

export default MessageAlert
