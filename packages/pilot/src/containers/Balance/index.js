import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  either,
  isNil,
  keys,
  map,
  propSatisfies,
  pipe,
  take,
} from 'ramda'
import {
  Button,
  Card,
  CardContent,
  Col,
  DateInput,
  Grid,
  Row,
} from 'former-kit'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import BalanceSummary from '../../components/BalanceSummary'
import BalanceTotalDisplay from '../../components/BalanceTotalDisplay'
import bulkAnticipationsLabels from '../../models/bulkAnticipationTypes'
import currencyFormatter from '../../formatters/currency'
import dateFormatter from '../../formatters/longDate'
import dateLimits from '../../models/dateSelectorLimits'
import datePresets from '../../models/dateSelectorPresets'
import DetailsHead from '../../components/DetailsHead'
import getColumns from '../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../formatters/columnTranslator'
import Operations from '../../components/Operations'
import operationsTypesLabels from '../../models/operationTypes'
import PendingRequests from '../../components/PendingRequests'
import style from './style.css'

const getDateLabels = t => ({
  anyDate: t('dates.any'),
  cancel: t('dates.cancel'),
  confirmPeriod: t('dates.confirm'),
  custom: t('dates.custom'),
  day: t('dates.day'),
  daySelected: t('dates.day_selected'),
  daysSelected: t('dates.selected'),
  end: t('dates.end'),
  noDayOrPeriodSelected: t('dates.no_selected'),
  period: t('dates.period'),
  select: t('dates.select'),
  start: t('dates.start'),
  today: t('dates.today'),
})

const datesEqual = (left, right) => {
  if (left.start === right.start && left.end === right.end) {
    return true
  }

  return (
    moment(left.start).diff(moment(right.start), 'days') === 0
    && moment(right.end).diff(moment(right.end), 'days') === 0
  )
}

const isEmptyDates = either(
  propSatisfies(isNil, 'end'),
  propSatisfies(isNil, 'start')
)

/*
 * TODO: remove this limits when the 'any date' option is removed
 * from the DateSelector.
*/
const anyDateRange = {
  end: moment(),
  start: moment().subtract(3, 'months'),
}

const formatAmount = (amount = 0) =>
  currencyFormatter(amount)

class Balance extends Component {
  constructor (props) {
    super(props)

    this.getHeadProp = this.getHeadProp.bind(this)
    this.getHeadProperties = this.getHeadProperties.bind(this)
    this.getPendingRequest = this.getPendingRequest.bind(this)
    this.getPendingRequests = this.getPendingRequests.bind(this)
    this.getSummaryTotal = this.getSummaryTotal.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)

    this.state = {
      dates: {
        end: props.dates.end,
        start: props.dates.start,
      },
    }
  }

  getHeadProp (key) {
    const {
      recipient: {
        bank_account, // eslint-disable-line camelcase
        id,
      },
      t,
    } = this.props
    const getTranslatedChild = () => {
      const childrenValue = bank_account[key]
      if (key === 'bank_code') {
        return t(`models.${key}.${childrenValue}`)
      }
      if (key === 'type') {
        return t(childrenValue)
      }
      if (key === 'id') {
        return id
      }
      return childrenValue
    }

    return ({
      children: <span>{getTranslatedChild()}</span>,
      title: t(`pages.balance.${key}`),
    })
  }

  getHeadProperties () {
    const {
      recipient: {
        bank_account: {
          account,
          agency,
          bank_code, // eslint-disable-line camelcase
          type,
        },
        id,
      },
    } = this.props

    return map(this.getHeadProp, keys({
      account,
      agency,
      bank_code,
      id,
      type,
    }))
  }

  getPendingRequest ({
    amount,
    created_at, // eslint-disable-line camelcase
    type,
  }) {
    const { t } = this.props
    const title = bulkAnticipationsLabels[type] || '-'
    return {
      amount: currencyFormatter(amount),
      created_at: dateFormatter(created_at),
      title: t(title),
    }
  }

  getPendingRequests () {
    const {
      requests,
    } = this.props

    const getRequests = pipe(
      take(3),
      map(this.getPendingRequest)
    )

    return getRequests(requests)
  }

  getSummaryTotal () {
    const {
      disabled,
      search: { total },
      t,
    } = this.props
    return {
      outcoming: {
        title: t('pages.balance.total.outcoming'),
        unit: t('currency'),
        value: disabled ? 0 : total.outcoming,
      },
      outgoing: {
        title: t('pages.balance.total.outgoing'),
        unit: t('currency'),
        value: disabled ? 0 : -total.outgoing,
      },
      net: {
        title: t('pages.balance.total.net'),
        unit: t('currency'),
        value: disabled ? 0 : total.net,
      },
    }
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  handleFilterClick () {
    if (isEmptyDates(this.state.dates)) {
      this.props.onFilterClick(anyDateRange)
    } else {
      this.props.onFilterClick(this.state.dates)
    }
  }

  handleOperationsPageChange (pageIndex) {
    const { onPageChange } = this.props
    onPageChange(pageIndex)
  }

  handleRequestCancelClick (requestIndex) {
    const {
      onCancelRequestClick,
      requests,
    } = this.props

    onCancelRequestClick(requests[requestIndex].id)
  }

  render () {
    const {
      balance: {
        amount,
        available: {
          anticipation,
          withdrawal,
        },
        outcoming,
      },
      company,
      currentPage,
      dates,
      disabled,
      onAnticipationClick,
      onCancelRequestClick,
      onWithdrawClick,
      search: {
        operations,
      },
      t,
    } = this.props

    const translateColumns = getColumnsTranslator(t)
    const typesLabels = map(t, operationsTypesLabels)

    const anticipationAction = {
      disabled,
      onClick: onAnticipationClick,
      title: t('pages.balance.anticipation'),
    }

    const withdrawalAction = {
      disabled,
      onClick: onWithdrawClick,
      title: t('pages.balance.withdraw'),
    }

    const filterDatesEqualCurrent = datesEqual(this.state.dates, dates)

    return (
      <Grid>
        <Row stretch>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <CardContent>
                <DetailsHead
                  identifier={company.name}
                  properties={this.getHeadProperties()}
                  title={t('pages.balance.recipient')}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row stretch>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <BalanceTotalDisplay
              action={isNil(onWithdrawClick) ? null : withdrawalAction}
              amount={formatAmount(amount)}
              detail={
                <span>
                  {t('pages.balance.available_withdrawal')}
                  <strong> {currencyFormatter(withdrawal)} </strong>
                </span>
              }
              disabled={disabled}
              title={t('pages.balance.withdrawal_title')}
            />
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <BalanceTotalDisplay
              action={isNil(onAnticipationClick) ? null : anticipationAction}
              amount={formatAmount(outcoming)}
              detail={
                <span>
                  {t('pages.balance.available_anticipation')}
                  <strong> {formatAmount(anticipation)} </strong>
                </span>
              }
              disabled={disabled}
              title={t('pages.balance.anticipation_title')}
            />
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <PendingRequests
              emptyMessage={t('pages.balance.pending_requests_empty_message')}
              loading={disabled}
              onCancel={isNil(onCancelRequestClick) ? null : this.handleRequestCancelClick}
              requests={this.getPendingRequests()}
              title={t('pages.balance.pending_requests_title')}
            />
          </Col>
        </Row>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card className={style.allowOverflow}>
              <CardContent>
                <div className={style.filter}>
                  <DateInput
                    active={filterDatesEqualCurrent}
                    value={this.state.dates}
                    disabled={disabled}
                    icon={<IconCalendar width={16} height={16} />}
                    limits={dateLimits}
                    onChange={this.handleDatesChange}
                    presets={datePresets}
                    strings={getDateLabels(this.props.t)}
                  />
                  <Button
                    disabled={filterDatesEqualCurrent}
                    fill="gradient"
                    onClick={this.handleFilterClick}
                    size="default"
                  >
                    {t('filter_action')}
                  </Button>
                </div>
              </CardContent>
              <CardContent>
                <BalanceSummary
                  amount={this.getSummaryTotal()}
                  dates={dates}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <Operations
                columns={translateColumns(getColumns(typesLabels))}
                currentPage={currentPage}
                disabled={disabled}
                emptyMessage={t('models.operations.empty_message')}
                exportLabel={t('models.operations.export')}
                loading={disabled}
                ofLabel={t('of')}
                onExport={() => null}
                onPageChange={this.handleOperationsPageChange}
                rows={operations.rows}
                subtitle={
                  <span>
                    {t('pages.balance.total.of')}
                    <strong> {operations.total} </strong>
                    {t('pages.balance.releases')}
                  </span>
                }
                title={t('pages.balance.operations_title')}
                totalPages={operations.count}
              />
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(
  PropTypes.shape({
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })
).isRequired

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired

const datesShape = PropTypes.shape({
  end: PropTypes.instanceOf(moment),
  start: PropTypes.instanceOf(moment),
})

Balance.propTypes = {
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      anticipation: PropTypes.number.isRequired,
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  company: PropTypes.shape({
    id: numberOrStringShape.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  dates: datesShape.isRequired, // eslint-disable-line react/no-typos
  disabled: PropTypes.bool.isRequired,
  onAnticipationClick: PropTypes.func.isRequired,
  onCancelRequestClick: PropTypes.func,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      account: PropTypes.string.isRequired,
      agency: PropTypes.string.isRequired,
      bank_code: PropTypes.string.isRequired,
      id: numberOrStringShape,
      type: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.shape({
    operations: PropTypes.shape({
      count: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          id: numberOrStringShape,
          net: PropTypes.number.isRequired,
          outcoming: cashFlowShape,
          outgoing: cashFlowShape,
          payment_date: PropTypes.shape({
            original: PropTypes.string,
            actual: PropTypes.string.isRequired,
          }),
          type: PropTypes.string.isRequired,
        })
      ),
      total: PropTypes.number.isRequired,
    }),
    total: PropTypes.shape({
      net: PropTypes.number.isRequired,
      outcoming: PropTypes.number.isRequired,
      outgoing: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

Balance.defaultProps = {
  onCancelRequestClick: null,
}

export default Balance
