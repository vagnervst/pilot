import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  RadioGroup,
} from 'former-kit'
import CpfInput from './renderCpfInput'
import CnpjInput from './renderCnpjInput'
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
      // não preciso mais do quantitySeected aqui
      // quantitySelected: undefined,
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
    this.handleQuantity = this.handleQuantity.bind(this)
    this.handlePartnerName = this.handlePartnerName.bind(this)
    this.handlePartnerCpf = this.handlePartnerCpf.bind(this)
    this.handlePartnerEmail = this.handlePartnerEmail.bind(this)
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

  handleQuantity (event) {
    // console.log(event)
    this.setState({
      quantitySelected: event.target.value,
    })
  }

  handlePartnerName (event) {
    this.setState({
      partnerName: event.target.value,
    })
  }

  handlePartnerCpf (event) {
    this.setState({
      partnerCpf: event.target.value,
    })
  }

  handlePartnerEmail (event) {
    this.setState({
      partnerEmail: event.target.value,
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
      cpf,
      cnpj,
      inputName,
      inputEmail,
      inputUrl,
      inputPhone,
      inputLegalName,
      inputLegalEmail,
      inputLegalUrl,
      inputLegalPhone,
      partnerName,
      partnerCpf,
      partnerEmail,
      quantitySelected,
    } = this.state

    return (
      <div>
        <Card>
          <CardContent>
            {this.handleChangeLabelCheck}
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
            {value === 'physic' &&
              <CpfInput
                cpf={cpf}
                // os dois não aparecem juntos
                checked={checked}
                onChangeCheckCpf={this.handleCheck}
              />}
            {value === 'legal' &&
              <CnpjInput
                cnpj={cnpj}
                checked={checked}
                onChangeCheckCnpj={this.handleCheck}
              />}
            <br />
            <br />
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
              value={this.state.quantitySelected}
              onChangeQuantity={this.handleQuantity}
              numbers={this.props.numbers}
              partnerName={partnerName}
              partnerCpf={partnerCpf}
              partnerEmail={partnerEmail}
              onChangePartnerName={this.handlePartnerName}
              onChangePartnerCpf={this.handlePartnerCpf}
              onChangePartnerEmail={this.handlePartnerEmail}
              quantitySelected={quantitySelected}
            />
          }
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
}

RecipientStep.defaultProps = {
  name: '',
  disabled: false,
  error: '',
  checked: false,
}

export default RecipientStep
