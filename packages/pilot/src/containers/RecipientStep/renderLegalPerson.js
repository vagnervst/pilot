import React from 'react'
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
}

export default LegalPerson
