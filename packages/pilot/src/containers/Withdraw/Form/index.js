import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardSection,
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import {
  always,
  apply,
  cond,
  equals,
  gt,
  gte,
  juxt,
  lt,
  pipe,
  prop,
  propSatisfies,
} from 'ramda'
import TotalDisplay from '../../../components/TotalDisplay'
import CardDisplay from '../../../components/CardDisplay'
import formatCurrency from '../../../formatters/currency'
import style from './style.css'

const chooseTransferCardColor = cond([
  [Number.isNaN, always('#757575')],
  [lt(0), always('#37cc9a')],
  [gte(0), always('#ff796f')],
])

const showErrorMessage = cond([
  [
    propSatisfies(gt(0), 'amount'),
    always('Valor a ser transferido está negativo!'),
  ],
  [
    pipe(
      juxt([prop('requested'), prop('maximum')]),
      apply(gt),
      equals(true)
    ),
    always('Valor requerido maior que o máximo'),
  ],
])

class WithdrawFormContainer extends Component {
  constructor (props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.renderCardActions = this.renderCardActions.bind(this)
    this.renderInputRow = this.renderInputRow.bind(this)
    this.renderInformationRow = this.renderInformationRow.bind(this)
  }

  handleInputChange (e) {
    const requested = e.target.valueAsNumber * 100
    const amount = requested + this.props.transferCost
    this.props.onAmountChange(requested, amount)
  }

  renderCardActions () {
    const {
      maximum,
      onCancel,
      onSubmit,
      requested,
      transferCost,
    } = this.props

    return (
      <CardActions>
        <Button
          fill="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          disabled={
            requested > maximum ||
            requested <= Math.abs(transferCost) ||
            !requested
          }
          onClick={onSubmit}
        >
          Continuar
        </Button>
      </CardActions>
    )
  }

  renderInputRow () {
    const {
      amount,
      available,
      maximum,
      requested,
    } = this.props

    return (
      <Row stretch>
        <Col
          desk={3}
          tv={3}
        />
        <Col
          desk={6}
          tv={3}
        >
          <CardSection>
            <CardContent className={style.formContent}>
              <div className={style.formMessage}>
                Digite o valor que deseja sacar
              </div>
              <div className={style.balance}>
                Saldo disponível:
                <span
                  className={style.available}
                >
                  {` ${formatCurrency(available)}`}
                </span>
              </div>
              <div className={style.inputSection}>
                <p>
                  Valor máximo a ser<br /> transferido:
                  <span className={style.maximum}>
                    {` ${formatCurrency(maximum)}`}
                  </span>
                </p>
                <FormInput
                  type="number"
                  value={requested / 100}
                  placeholder="Digite o valor"
                  name="withdrawValue"
                  label="Valor do saque (R$)"
                  onChange={this.handleInputChange}
                  error={showErrorMessage({ requested, amount, maximum })}
                />
              </div>
            </CardContent>
          </CardSection>
        </Col>
        <Col
          desk={3}
          tv={3}
        />
      </Row>
    )
  }

  renderInformationRow () {
    const {
      amount,
      date,
      requested,
      transferCost,
    } = this.props

    return (
      <Row stretch>
        <Col
          desk={3}
          tv={3}
        >
          <CardSection>
            <div className={style.content}>
              <CardDisplay
                title="Data de saída"
                value={moment(date).format('DD/MM/YYYY')}
              />
            </div>
          </CardSection>
        </Col>
        <Col
          desk={3}
          tv={3}
        >
          <CardSection>
            <div className={style.content}>
              <TotalDisplay
                title="Valor solicitado"
                amount={requested}
                color="#37cc9a"
                unit="R$"
              />
            </div>
          </CardSection>
        </Col>
        <Col
          desk={3}
          tv={3}
        >
          <CardSection>
            <div className={style.content}>
              <TotalDisplay
                title="Custo da transferência"
                amount={transferCost}
                color="#ff796f"
                unit="R$"
              />
            </div>
          </CardSection>
        </Col>
        <Col
          desk={3}
          tv={3}
        >
          <CardSection>
            <div className={style.content}>
              <TotalDisplay
                title="Valor a ser transferido"
                amount={amount}
                color={chooseTransferCardColor(amount)}
                unit="R$"
              />
            </div>
          </CardSection>
        </Col>
      </Row>
    )
  }

  render () {
    return (
      <Card>
        <CardContent>
          <Grid>
            {this.renderInputRow()}
            {this.renderInformationRow()}
          </Grid>
        </CardContent>
        {this.renderCardActions()}
      </Card>
    )
  }
}

WithdrawFormContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maximum: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  requested: PropTypes.number.isRequired,
  transferCost: PropTypes.number.isRequired,
}

export default WithdrawFormContainer
