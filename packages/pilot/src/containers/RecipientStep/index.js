import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Col,
  Grid,
  FormInput,
  FormCheckbox,
  RadioGroup,
  Row,
} from 'former-kit'
import PhysicPerson from './renderPhysicPerson'
import LegalPerson from './renderLegalPerson'
import recipientTypes from '../../models/recipientTypes'
import styles from './style.css'

class RecipientStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'physic',
      checked: props.checked,
      quantitySelected: props.quantitySelected,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeLegalName = this.handleChangeLegalName.bind(this)
    this.handleChangeLegalEmail = this.handleChangeLegalEmail.bind(this)
    this.handleChangeLegalUrl = this.handleChangeLegalUrl.bind(this)
    this.handleChangeLegalPhone = this.handleChangeLegalPhone.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleCheck () {
    this.setState({
      checked: !this.state.checked,
    })
  }

  handleChangeName (event) {
    this.setState({
      inputName: event.target.value,
    })
  }

  handleChangeEmail (event) {
    this.setState({
      inputEmail: event.target.value,
    })
  }

  handleChangeUrl (event) {
    this.setState({
      inputUrl: event.target.value,
    })
  }

  handleChangePhone (event) {
    this.setState({
      inputPhone: event.target.value,
    })
  }

  handleChangeLegalName (event) {
    this.setState({
      inputLegalName: event.target.value,
    })
  }

  handleChangeLegalEmail (event) {
    this.setState({
      inputLegalEmail: event.target.value,
    })
  }

  handleChangeLegalUrl (event) {
    this.setState({
      inputLegalUrl: event.target.value,
    })
  }

  handleChangeLegalPhone (event) {
    this.setState({
      inputLegalPhone: event.target.value,
    })
  }

  handleQuantityChange (event) {
    this.setState({
      quantitySelected: event.target.value,
    })
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.input.current.value);
  //   event.preventDefault();
  // }

  render () {
    const {
      disabled,
      error,
      name,
    } = this.props

    const {
      value,
      checked,
      cnpj,
      inputName,
      inputEmail,
      inputUrl,
      inputPhone,
      inputLegalName,
      inputLegalEmail,
      inputLegalUrl,
      inputLegalPhone,
    } = this.state

    return (
      <div>
        <Card>
          <CardContent>
            <h2>Identificação</h2>
            <h3>
            Escolha qual tipo de pessoa do seu recebedor e preencha o documento
            </h3>
            <span className={styles.spanRadioBtn}>Tipo de recebedor</span>
            <RadioGroup
              options={recipientTypes}
              name={name}
              onChange={this.handleChange}
              value={value}
              disabled={disabled}
              error={error}
            />
            <Grid>
              <Row>
                <Col>
                  <FormInput
                    size={30}
                    maxLength={30}
                    inputStyle="form"
                    label="CNPJ"
                    value={cnpj}
                    onChange={e => this.setState({ cnpj: e.target.value })}
                  />
                </Col>
              </Row>
            </Grid>
            <br />
            <br />
            <FormCheckbox
              label="Quero incluir informações sobre a empresa e os sócios"
              name="info"
              error={error}
              disabled={disabled}
              checked={checked}
              onChange={this.handleCheck}
            />
          </CardContent>
          {checked && value === 'physic' &&
            <PhysicPerson
              inputName={inputName}
              inputEmail={inputEmail}
              inputUrl={inputUrl}
              inputPhone={inputPhone}
              onChangeName={this.handleChangeName}
              onChangeEmail={this.handleChangeEmail}
              onChangeUrl={this.handleChangeUrl}
              onChangePhone={this.handleChangePhone}
              // master, saque e estorno
              // como cria o componente e como manipula as propriedades que eles usam
            />}
          {checked && value === 'legal' &&
            <LegalPerson
              inputLegalName={inputLegalName}
              inputLegalEmail={inputLegalEmail}
              inputLegalUrl={inputLegalUrl}
              inputLegalPhone={inputLegalPhone}
              onChangeLegalName={this.handleChangeLegalName}
              onChangeLegalEmail={this.handleChangeLegalEmail}
              onChangeLegalUrl={this.handleChangeLegalUrl}
              onChangeLegalPhone={this.handleChangeLegalPhone}
              quantitySelected={this.state.quantitySelected}
              value={this.state.quantitySelected}
              options={this.props.numbers}
              onChangeQuantity={this.handleQuantityChange}
            />}
          <br />
          <CardActions>
            <Button fill="outline">Cancelar</Button>
            <Button fill="gradient">Continuar</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
RecipientStep.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  checked: PropTypes.bool,
  numbers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  quantitySelected: PropTypes.string,
}

RecipientStep.defaultProps = {
  name: '',
  disabled: false,
  error: '',
  checked: false,
  quantitySelected: 'zero',
}

export default RecipientStep
