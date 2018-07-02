import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import RecipientPartner from './RecipientPartner/index'

const LegalPerson = ({
  inputLegalName,
  inputLegalEmail,
  inputLegalUrl,
  inputLegalPhone,
  onChangeLegalName,
  onChangeLegalEmail,
  onChangeLegalUrl,
  onChangeLegalPhone,
  quantitySelected,
  onChangeQuantity,
  numbers,
  partnerName,
  partnerCpf,
  partnerEmail,
  onChangePartnerName,
  onChangePartnerCpf,
  onChangePartnerEmail,
  partnerNameTwo,
  partnerCpfTwo,
  partnerEmailTwo,
  onChangePartnerNameTwo,
  onChangePartnerCpfTwo,
  onChangePartnerEmailTwo,
  partnerNameThree,
  partnerCpfThree,
  partnerEmailThree,
  onChangePartnerNameThree,
  onChangePartnerCpfThree,
  onChangePartnerEmailThree,
  partnerNameFour,
  partnerCpfFour,
  partnerEmailFour,
  onChangePartnerNameFour,
  onChangePartnerCpfFour,
  onChangePartnerEmailFour,
  partnerNameFive,
  partnerCpfFive,
  partnerEmailFive,
  onChangePartnerNameFive,
  onChangePartnerCpfFive,
  onChangePartnerEmailFive,
}) => (
  <CardContent>
    <h2>Empresa</h2>
    <h3>
      Preencha abaixo as informações sobre a empresa do seu recebedor
    </h3>
    <Grid>
      <Row>
        <Col>
          <FormInput
            size={30}
            maxLength={30}
            inputStyle="form"
            type="text"
            label="Nome da Empresa"
            name="name"
            value={inputLegalName}
            onChange={onChangeLegalName}
          />
        </Col>
      </Row>
    </Grid>
    <br />
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
          label="E-mail(Opcional)"
          value={inputLegalEmail}
          onChange={onChangeLegalEmail}
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
          label="URL(Opcional)"
          value={inputLegalUrl}
          onChange={onChangeLegalUrl}
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
          value={inputLegalPhone}
          onChange={onChangeLegalPhone}
        />
      </Col>
    </Row>
    <h2>Sócios</h2>
    <h3>
      Preencha abaixo as informações sobre os sócios do seu recebedor
    </h3>
    <Grid>
      <Row>
        <Col>
          <FormDropdown
            options={numbers}
            name="dropdownLegal"
            value={quantitySelected}
            label="Escolha a quantidade de sócios"
            onChange={onChangeQuantity}
          />
        </Col>
      </Row>
    </Grid>
    <br />
    {/* // Carregando a Lógica aqui no filho e passando para o pai */}
    {quantitySelected === 'one' &&
      <RecipientPartner
        partnerName={partnerName}
        partnerCpf={partnerCpf}
        partnerEmail={partnerEmail}
        onChangePartnerName={onChangePartnerName}
        onChangePartnerCpf={onChangePartnerCpf}
        onChangePartnerEmail={onChangePartnerEmail}
      />
  // Para fazer o resto terei que criar ma variável para cada quantidade para cada RecipientPartner
    }
    {quantitySelected === 'two' &&
    <Fragment>
      <RecipientPartner
        partnerName={partnerName}
        partnerCpf={partnerCpf}
        partnerEmail={partnerEmail}
        onChangePartnerName={onChangePartnerName}
        onChangePartnerCpf={onChangePartnerCpf}
        onChangePartnerEmail={onChangePartnerEmail}
      />
      <RecipientPartner
        partnerName={partnerNameTwo}
        partnerCpf={partnerCpfTwo}
        partnerEmail={partnerEmailTwo}
        onChangePartnerName={onChangePartnerNameTwo}
        onChangePartnerCpf={onChangePartnerCpfTwo}
        onChangePartnerEmail={onChangePartnerEmailTwo}
      />
    </Fragment>
    }
    {quantitySelected === 'three' &&
    <Fragment>
      <RecipientPartner
        partnerName={partnerName}
        partnerCpf={partnerCpf}
        partnerEmail={partnerEmail}
        onChangePartnerName={onChangePartnerName}
        onChangePartnerCpf={onChangePartnerCpf}
        onChangePartnerEmail={onChangePartnerEmail}
      />
      <RecipientPartner
        partnerName={partnerNameTwo}
        partnerCpf={partnerCpfTwo}
        partnerEmail={partnerEmailTwo}
        onChangePartnerName={onChangePartnerNameTwo}
        onChangePartnerCpf={onChangePartnerCpfTwo}
        onChangePartnerEmail={onChangePartnerEmailTwo}
      />
      <RecipientPartner
        partnerName={partnerNameThree}
        partnerCpf={partnerCpfThree}
        partnerEmail={partnerEmailThree}
        onChangePartnerName={onChangePartnerNameThree}
        onChangePartnerCpf={onChangePartnerCpfThree}
        onChangePartnerEmail={onChangePartnerEmailThree}
      />
    </Fragment>
    }
    {quantitySelected === 'four' &&
    <Fragment>
      <RecipientPartner
        partnerName={partnerName}
        partnerCpf={partnerCpf}
        partnerEmail={partnerEmail}
        onChangePartnerName={onChangePartnerName}
        onChangePartnerCpf={onChangePartnerCpf}
        onChangePartnerEmail={onChangePartnerEmail}
      />
      <RecipientPartner
        partnerName={partnerNameTwo}
        partnerCpf={partnerCpfTwo}
        partnerEmail={partnerEmailTwo}
        onChangePartnerName={onChangePartnerNameTwo}
        onChangePartnerCpf={onChangePartnerCpfTwo}
        onChangePartnerEmail={onChangePartnerEmailTwo}
      />
      <RecipientPartner
        partnerName={partnerNameThree}
        partnerCpf={partnerCpfThree}
        partnerEmail={partnerEmailThree}
        onChangePartnerName={onChangePartnerNameThree}
        onChangePartnerCpf={onChangePartnerCpfThree}
        onChangePartnerEmail={onChangePartnerEmailThree}
      />
      <RecipientPartner
        partnerName={partnerNameFour}
        partnerCpf={partnerCpfFour}
        partnerEmail={partnerEmailFour}
        onChangePartnerName={onChangePartnerNameFour}
        onChangePartnerCpf={onChangePartnerCpfFour}
        onChangePartnerEmail={onChangePartnerEmailFour}
      />
    </Fragment>
    }
    {quantitySelected === 'five' &&
    <Fragment>
      <RecipientPartner
        partnerName={partnerName}
        partnerCpf={partnerCpf}
        partnerEmail={partnerEmail}
        onChangePartnerName={onChangePartnerName}
        onChangePartnerCpf={onChangePartnerCpf}
        onChangePartnerEmail={onChangePartnerEmail}
      />
      <RecipientPartner
        partnerName={partnerNameTwo}
        partnerCpf={partnerCpfTwo}
        partnerEmail={partnerEmailTwo}
        onChangePartnerName={onChangePartnerNameTwo}
        onChangePartnerCpf={onChangePartnerCpfTwo}
        onChangePartnerEmail={onChangePartnerEmailTwo}
      />
      <RecipientPartner
        partnerName={partnerNameThree}
        partnerCpf={partnerCpfThree}
        partnerEmail={partnerEmailThree}
        onChangePartnerName={onChangePartnerNameThree}
        onChangePartnerCpf={onChangePartnerCpfThree}
        onChangePartnerEmail={onChangePartnerEmailThree}
      />
      <RecipientPartner
        partnerName={partnerNameFour}
        partnerCpf={partnerCpfFour}
        partnerEmail={partnerEmailFour}
        onChangePartnerName={onChangePartnerNameFour}
        onChangePartnerCpf={onChangePartnerCpfFour}
        onChangePartnerEmail={onChangePartnerEmailFour}
      />
      <RecipientPartner
        partnerName={partnerNameFive}
        partnerCpf={partnerCpfFive}
        partnerEmail={partnerEmailFive}
        onChangePartnerName={onChangePartnerNameFive}
        onChangePartnerCpf={onChangePartnerCpfFive}
        onChangePartnerEmail={onChangePartnerEmailFive}
      />
    </Fragment>
    }

  </CardContent>
)

LegalPerson.propTypes = {
  inputLegalName: PropTypes.string,
  inputLegalEmail: PropTypes.string,
  inputLegalUrl: PropTypes.string,
  inputLegalPhone: PropTypes.string,
  onChangeLegalName: PropTypes.func,
  onChangeLegalEmail: PropTypes.func,
  onChangeLegalUrl: PropTypes.func,
  onChangeLegalPhone: PropTypes.func,
  quantitySelected: PropTypes.string,
  onChangeQuantity: PropTypes.func,
  partnerName: PropTypes.string,
  partnerCpf: PropTypes.string,
  partnerEmail: PropTypes.string,
  onChangePartnerName: PropTypes.func,
  onChangePartnerCpf: PropTypes.func,
  onChangePartnerEmail: PropTypes.func,
  partnerNameTwo: PropTypes.string,
  partnerCpfTwo: PropTypes.string,
  partnerEmailTwo: PropTypes.string,
  onChangePartnerNameTwo: PropTypes.func,
  onChangePartnerCpfTwo: PropTypes.func,
  onChangePartnerEmailTwo: PropTypes.func,
  partnerNameThree: PropTypes.string,
  partnerCpfThree: PropTypes.string,
  partnerEmailThree: PropTypes.string,
  onChangePartnerNameThree: PropTypes.func,
  onChangePartnerCpfThree: PropTypes.func,
  onChangePartnerEmailThree: PropTypes.func,
  partnerNameFour: PropTypes.string,
  partnerCpfFour: PropTypes.string,
  partnerEmailFour: PropTypes.string,
  onChangePartnerNameFour: PropTypes.func,
  onChangePartnerCpfFour: PropTypes.func,
  onChangePartnerEmailFour: PropTypes.func,
  partnerNameFive: PropTypes.string,
  partnerCpfFive: PropTypes.string,
  partnerEmailFive: PropTypes.string,
  onChangePartnerNameFive: PropTypes.func,
  onChangePartnerCpfFive: PropTypes.func,
  onChangePartnerEmailFive: PropTypes.func,
  numbers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
}

LegalPerson.defaultProps = {
  inputLegalName: '',
  inputLegalEmail: '',
  inputLegalUrl: '',
  inputLegalPhone: '',
  onChangeLegalName: onChangeName => onChangeName,
  onChangeLegalEmail: onChangeEmail => onChangeEmail,
  onChangeLegalUrl: onChangeUrl => onChangeUrl,
  onChangeLegalPhone: onChangePhone => onChangePhone,
  quantitySelected: 'zero',
  onChangeQuantity: onChangeQuantity => onChangeQuantity,
  partnerName: '',
  partnerCpf: '',
  partnerEmail: '',
  onChangePartnerName: onChangePartnerName => onChangePartnerName,
  onChangePartnerCpf: onChangePartnerCpf => onChangePartnerCpf,
  onChangePartnerEmail: onChangePartnerEmail => onChangePartnerEmail,
  partnerNameTwo: '',
  partnerCpfTwo: '',
  partnerEmailTwo: '',
  onChangePartnerNameTwo: onChangePartnerNameTwo => onChangePartnerNameTwo,
  onChangePartnerCpfTwo: onChangePartnerCpfTwo => onChangePartnerCpfTwo,
  onChangePartnerEmailTwo: onChangePartnerEmailTwo => onChangePartnerEmailTwo,
  partnerNameThree: '',
  partnerCpfThree: '',
  partnerEmailThree: '',
  onChangePartnerNameThree: onChangePartnerNameThree => onChangePartnerNameThree,
  onChangePartnerCpfThree: onChangePartnerCpfThree => onChangePartnerCpfThree,
  onChangePartnerEmailThree: onChangePartnerEmailThree => onChangePartnerEmailThree,
  partnerNameFour: '',
  partnerCpfFour: '',
  partnerEmailFour: '',
  onChangePartnerNameFour: onChangePartnerNameFour => onChangePartnerNameFour,
  onChangePartnerCpfFour: onChangePartnerCpfFour => onChangePartnerCpfFour,
  onChangePartnerEmailFour: onChangePartnerEmailFour => onChangePartnerEmailFour,
  partnerNameFive: '',
  partnerCpfFive: '',
  partnerEmailFive: '',
  onChangePartnerNameFive: onChangePartnerNameFive => onChangePartnerNameFive,
  onChangePartnerCpfFive: onChangePartnerCpfFive => onChangePartnerCpfFive,
  onChangePartnerEmailFive: onChangePartnerEmailFive => onChangePartnerEmailFive,
}

export default LegalPerson
