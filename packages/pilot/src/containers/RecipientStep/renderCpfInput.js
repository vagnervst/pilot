import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormCheckbox,
  FormInput,
  Grid,
  Row,
} from 'former-kit'

const CpfInput = ({
  // checked,
  // cpf,
  disabled,
  error,
  // onChangeCpf,
  // onChangeCheckCpf,
}) => (
  <Fragment>
    <Grid>
      <Row>
        <Col>
          <FormInput
            size={30}
            maxLength={11}
            inputStyle="form"
            label="CPF"
            name="cpf"
            // value={cpf}
            // onChange={onChangeCpf}
          />
          <br />
          <br />
        </Col>
      </Row>
    </Grid>
    <FormCheckbox
      label="Quero incluir mais informações sobre o recebedor"
      name="info"
      error={error}
      disabled={disabled}
      // checked={checked}
      // onChange={onChangeCheckCpf}
    />
  </Fragment>
)

CpfInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  // checked: PropTypes.bool,
  // cpf: PropTypes.string,
  // onChangeCpf: PropTypes.func,
  // onChangeCheckCpf: PropTypes.func,
}

CpfInput.defaultProps = {
  disabled: false,
  error: '',
  // checked: false,
  // cpf: '',
  // onChangeCpf: onChangeCpf => onChangeCpf,
  // onChangeCheckCpf: onChangeCheckCpf => onChangeCheckCpf,
}

export default CpfInput
