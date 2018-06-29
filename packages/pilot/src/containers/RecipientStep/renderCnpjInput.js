import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormCheckbox,
  FormInput,
  Grid,
  Row,
} from 'former-kit'

const CnpjInput = ({
  checked,
  cnpj,
  disabled,
  error,
  onChangeCnpj,
  onChangeCheckCnpj,
}) => (
  <Fragment>
    <Grid>
      <Row>
        <Col>
          <FormInput
            size={30}
            maxLength={30}
            inputStyle="form"
            label="CNPJ"
            value={cnpj}
            onChange={onChangeCnpj}
          />
          <br />
          <br />
        </Col>
      </Row>
    </Grid>
    <FormCheckbox
      label="Quero incluir informações sobre a empresa e os sócios"
      name="info"
      error={error}
      disabled={disabled}
      checked={checked}
      onChange={onChangeCheckCnpj}
    />
  </Fragment>

)

CnpjInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  checked: PropTypes.bool,
  cnpj: PropTypes.string,
  onChangeCnpj: PropTypes.func,
  onChangeCheckCnpj: PropTypes.func,
}

CnpjInput.defaultProps = {
  disabled: false,
  error: '',
  checked: false,
  cnpj: '',
  onChangeCnpj: onChangeCnpj => onChangeCnpj,
  onChangeCheckCnpj: onChangeCheckCnpj => onChangeCheckCnpj,
}

export default CnpjInput
