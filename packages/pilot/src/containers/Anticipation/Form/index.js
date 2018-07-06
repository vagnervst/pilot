import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { always, isNil } from 'ramda'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Col,
  Row,
  Grid,
  Spacing,
  Tooltip,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import DetailsHead from '../../../components/DetailsHead'
import TotalDisplay from '../../../components/TotalDisplay'
import Form from './Form'
import formatAccountType from '../../../formatters/accountType'
import formatAgencyAccount from '../../../formatters/agencyAccount'
import formatCpfCnpj from '../../../formatters/cpfCnpj'
import formatCurrency from '../../../formatters/currency'
import style from './style.css'

const renderInfo = (text, placement) => (
  <Tooltip
    placement={placement || 'rightMiddle'}
    content={text}
  >
    <IconInfo height={16} width={16} />
  </Tooltip>
)

const colors = {
  amount: '#37cc9a',
  cost: '#ff796f',
  requested: '#37cc9a',
}

class AnticipationFormContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: props.date,
        end: props.date,
      },
      hasErrors: false,
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleCalculateSubmit = this.handleCalculateSubmit.bind(this)
  }

  componentWillReceiveProps ({ date }) {
    if (date && !date.isSame(this.state.dates.start, 'day')) {
      this.setState({
        dates: {
          start: date,
          end: date,
        },
      })
    }
  }

  handleDateChange (dates) {
    this.setState({ dates })
  }

  handleCalculateSubmit ({
    transfer,
    dates,
    requested,
    ...values
  }, errors) {
    if (isNil(errors)) {
      const isAutomaticTransfer = transfer === 'yes'

      this.props.onCalculateSubmit({
        date: dates.start,
        isAutomaticTransfer,
        requested: Number(requested),
        ...values,
      })
      this.setState({ hasErrors: false })
    } else {
      this.setState({ hasErrors: true })
    }
  }

  render () {
    const {
      amount,
      approximateRequested,
      bankAccount: {
        agencia,
        agencia_dv: agenciaDv,
        bank_code: bankCode,
        conta,
        conta_dv: contaDv,
        document_number: documentNumber,
        legal_name: legalName,
        type,
      },
      cost,
      isAutomaticTransfer,
      isValidDay,
      loading,
      maximum,
      minimum,
      onCancel,
      onConfirm,
      requested,
      t,
      timeframe,
      transferCost,
    } = this.props
    const {
      dates,
      hasErrors,
    } = this.state

    const unit = t('currency_symbol')

    return (
      <Fragment>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <CardContent>
                <DetailsHead
                  identifier={legalName}
                  properties={[
                    {
                      children: bankCode,
                      title: t('models.bank_account.bank'),
                    },
                    {
                      children: formatAgencyAccount(agencia, agenciaDv),
                      title: t('models.bank_account.agency'),
                    },
                    {
                      children: formatAgencyAccount(conta, contaDv),
                      title: t('models.bank_account.account'),
                    },
                    {
                      children: formatAccountType(t, type),
                      title: t('models.bank_account.account_type'),
                    },
                    {
                      children: formatCpfCnpj(documentNumber),
                      title: t('models.bank_account.document'),
                    },
                  ]}
                  title={t('models.bank_account.legal_name')}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row stretch>
          <Col
            desk={8}
            palm={12}
            tablet={12}
            tv={8}
          >
            <Card>
              <Form
                anticipationInfo={renderInfo(t('pages.anticipation.date.advise'))}
                dates={dates}
                isAutomaticTransfer={isAutomaticTransfer}
                isValidDay={isValidDay}
                loading={loading}
                maximum={maximum}
                minimum={minimum}
                onChangeDate={this.handleDateChange}
                onSubmit={this.handleCalculateSubmit}
                periodInfo={renderInfo(t('pages.anticipation.period.advise'))}
                requested={requested}
                t={t}
                timeframe={timeframe}
              />
            </Card>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={12}
            tv={4}
          >
            <Card className={style.summaryContainer}>
              <CardContent className={style.summary}>
                <Grid>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={approximateRequested}
                        color={colors.requested}
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.requested.advise'),
                              'bottomStart'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.requested.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={(cost + transferCost)}
                        color={colors.cost}
                        subtitle={
                          <span>
                            <div>
                              {t(
                                'pages.anticipation.cost.anticipation',
                                { cost: formatCurrency(cost) }
                              )}
                            </div>
                            <div>
                              {t(
                                'pages.anticipation.cost.transfer',
                                { cost: formatCurrency(transferCost) }
                              )}
                            </div>
                          </span>
                        }
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.cost.advise'),
                              'bottomStart'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.cost.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={amount}
                        color={colors.amount}
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.amount.advise'),
                              'bottomStart'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.amount.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  disabled={loading || hasErrors}
                  fill="outline"
                  onClick={onCancel}
                  type="button"
                >
                  {t('pages.anticipation.cancel')}
                </Button>
                <Button
                  disabled={loading || hasErrors}
                  onClick={onConfirm}
                  type="button"
                >
                  {t('pages.anticipation.continue')}
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

AnticipationFormContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number.isRequired,
  bankAccount: PropTypes.shape({
    agencia_dv: PropTypes.string,
    agencia: PropTypes.string,
    bank_code: PropTypes.string,
    conta_dv: PropTypes.string,
    conta: PropTypes.string,
    document_number: PropTypes.string,
    document_type: PropTypes.string,
    legal_name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  cost: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(moment),
  isAutomaticTransfer: PropTypes.bool,
  isValidDay: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf(['end', 'start']),
  transferCost: PropTypes.number.isRequired,
}

AnticipationFormContainer.defaultProps = {
  date: moment(),
  isAutomaticTransfer: true,
  isValidDay: always(true),
  timeframe: 'start',
}

export default AnticipationFormContainer
