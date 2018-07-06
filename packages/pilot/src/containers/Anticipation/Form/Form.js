import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  always,
  ifElse,
  pipe,
  propOr,
} from 'ramda'
import Form from 'react-vanilla-form'
import {
  Button,
  CalendarInput,
  Card,
  CardContent,
  Col,
  FormInput,
  Grid,
  RadioGroup,
  Row,
  SegmentedSwitch,
  Spacing,
} from 'former-kit'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import CurrencyInput from '../../../components/CurrencyInput'
import formatCurrency from '../../../formatters/currency'
import greaterThanValidation from '../../../validation/greaterThan'
import lessThanValidation from '../../../validation/lessThan'
import numberValidation from '../../../validation/number'
import requiredValidation from '../../../validation/required'
import style from './style.css'

const validateDate = (t, isValidDay) => pipe(
  propOr(null, 'start'),
  ifElse(
    isValidDay,
    always(false),
    always(t('pages.anticipation.date.error'))
  )
)

const AnticipationForm = ({
  anticipationInfo,
  dates,
  isAutomaticTransfer,
  isValidDay,
  loading,
  maximum,
  minimum,
  onChangeDate,
  onSubmit,
  periodInfo,
  requested,
  t,
  timeframe,
}) => (
  <Form
    data={{
      dates,
      requested: requested.toString(),
      timeframe,
      transfer: isAutomaticTransfer ? 'yes' : 'no',
    }}
    validateOn="blur"
    validation={{
      date: validateDate(t, isValidDay),
      requested: [
        requiredValidation(t('pages.anticipation.required_error')),
        numberValidation(t('pages.refund.number')),
        greaterThanValidation(maximum, t('pages.anticipation.maximum_error')),
        lessThanValidation(minimum, t('pages.anticipation.minimum_error')),
      ],
    }}
    onSubmit={onSubmit}
  >
    <Card className={style.content}>
      <CardContent>
        <Grid>

          <Row>
            <Col>
              <label htmlFor="timeframe" className={style.label}>
                <span>{t('pages.anticipation.period.title')}</span>
                <Spacing size="tiny" />
                {periodInfo}
              </label>
              <SegmentedSwitch
                name="timeframe"
                options={[
                  {
                    title: t('pages.anticipation.start'),
                    value: 'start',
                  },
                  {
                    title: t('pages.anticipation.from_end'),
                    value: 'end',
                  },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <label htmlFor="dates" className={style.label}>
                {t('pages.anticipation.date.label')}
                <Spacing size="tiny" />
                {anticipationInfo}
              </label>
              <CalendarInput
                value={dates}
                dateSelection="single"
                icon={<IconCalendar width={16} height={16} />}
                months={1}
                name="dates"
                isValidDay={isValidDay}
                onChange={onChangeDate}
                strings={{
                  end: t('pages.anticipation.end'),
                  select: t('pages.anticipation.select'),
                  start: t('pages.anticipation.initial'),
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormInput
                label={t(
                  'pages.anticipation.requested.label',
                  { currency: t('currency_symbol') }
                )}
                name="requested"
                disabled={loading}
                renderer={props => (
                  <CurrencyInput
                    max={99999999999}
                    {...props}
                  />
                )}
                type="text"
              />
            </Col>
            <Col>
              <div className={style.avaiableTitle}>{t('pages.anticipation.avaiable.title')}</div>
              <div>
                <span>{t('pages.anticipation.avaiable.max')}</span>
                <strong className={style.avaiable}>
                  {formatCurrency(maximum)}
                </strong>
                <span>{t('pages.anticipation.avaiable.min')}</span>
                <strong className={style.avaiable}>
                  {formatCurrency(minimum)}
                </strong>
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <label htmlFor="transfer" className={style.label}>
                {t('pages.anticipation.requested.label')}
                <Spacing size="tiny" />
                {periodInfo}
              </label>
              <RadioGroup
                name="transfer"
                options={[
                  {
                    name: t('pages.anticipation.yes'),
                    value: 'yes',
                  },
                  {
                    name: t('pages.anticipation.no'),
                    value: 'no',
                  },
                ]}
                value={isAutomaticTransfer ? 'yes' : 'no'}
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
              <div>
                <Button
                  fill="outline"
                  type="submit"
                >
                  {t('pages.anticipation.simulate')}
                </Button>
              </div>
              <hr className={style.spacer} />
              <p>{t('pages.anticipation.advise')}</p>
            </Col>
          </Row>

        </Grid>
      </CardContent>
    </Card>
  </Form>
)

AnticipationForm.propTypes = {
  anticipationInfo: PropTypes.element.isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(moment),
    start: PropTypes.instanceOf(moment),
  }).isRequired,
  isAutomaticTransfer: PropTypes.bool.isRequired,
  isValidDay: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf(['end', 'start']).isRequired,
  periodInfo: PropTypes.element.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default AnticipationForm
