import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormInput,
  Row,
} from 'former-kit'

const PartnerRecipient = ({
  partnerName,
  partnerCpf,
  partnerEmail,
  onChangePartnerName,
  onChangePartnerCpf,
  onChangePartnerEmail,
}) => (
  <Fragment>
    <Row stretch>
      <Col
        desk={2}
        palm={2}
        tablet={2}
        tv={2}
      >
        <FormInput
          size={30}
          maxLength={30}
          inputStyle="form"
          type="text"
          label="Nome"
          value={partnerName}
          onChange={onChangePartnerName}
        />
      </Col>
      <Col
        desk={2}
        palm={2}
        tablet={2}
        tv={2}
      >
        <FormInput
          size={30}
          maxLength={30}
          inputStyle="form"
          type="text"
          label="CPF"
          value={partnerCpf}
          onChange={onChangePartnerCpf}
        />
      </Col>
      <Col
        desk={1}
        palm={1}
        tablet={1}
        tv={1}
      >
        <FormInput
          size={30}
          maxLength={30}
          inputStyle="form"
          type="text"
          label="Telefone(Opcional)"
          value={partnerEmail}
          onChange={onChangePartnerEmail}
        />
      </Col>
    </Row>
  </Fragment>
)

PartnerRecipient.propTypes = {
  partnerName: PropTypes.string,
  partnerCpf: PropTypes.string,
  partnerEmail: PropTypes.string,
  onChangePartnerName: PropTypes.func,
  onChangePartnerCpf: PropTypes.func,
  onChangePartnerEmail: PropTypes.func,
}

PartnerRecipient.defaultProps = {
  partnerName: '',
  partnerCpf: '',
  partnerEmail: '',
  onChangePartnerName: onChangePartnerName => onChangePartnerName,
  onChangePartnerCpf: onChangePartnerCpf => onChangePartnerCpf,
  onChangePartnerEmail: onChangePartnerEmail => onChangePartnerEmail,
}

export default PartnerRecipient
