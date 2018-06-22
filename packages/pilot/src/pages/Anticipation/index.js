import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  apply,
  compose,
  head,
  juxt,
  path,
  pipe,
  prop,
  subtract,
} from 'ramda'
import moment from 'moment'

const mapStateToProps = ({
  account: {
    client,
  },
}) => ({
  client,
})

// @TODO: Add error handler
const getAnticipationLimits = (client, {
  payment_date: paymentDate,
  recipientId,
  timeframe,
}) => (
  client
    .bulkAnticipations
    .limits({
      payment_date: paymentDate.valueOf(),
      recipientId,
      timeframe,
    })
)

const calculateLimits = propName => pipe(
  prop(propName),
  juxt([
    prop('amount'),
    prop('anticipation_fee'),
    prop('fee'),
    prop('fraud_coverage_fee'),
  ]),
  apply(subtract)
)

const calculateMaxLimit = calculateLimits('maximum')
const calculateMinLimit = calculateLimits('minimum')

const createBulk = (client, {
  automaticTransfer,
  paymentDate,
  recipientId,
  requestedAmount,
  timeframe,
}) => (
  client.bulkAnticipations.create({
    automatic_transfer: automaticTransfer,
    build: true,
    payment_date: paymentDate.valueOf(),
    recipientId,
    requested_amount: requestedAmount,
    timeframe,
  })
)

const updateBulk = (client, {
  automaticTransfer,
  bulkId,
  paymentDate,
  recipientId,
  requestedAmount,
  timeframe,
}) => (
  client.bulkAnticipations.update({
    automatic_transfer: automaticTransfer,
    id: bulkId,
    payment_date: paymentDate.valueOf(),
    recipientId,
    requested_amount: requestedAmount,
    timeframe,
  })
)

const confirmBulk = (client, {
  bulkId,
  recipientId,
}) => (
  client.bulkAnticipations.confirm({
    id: bulkId,
    recipientId,
  })
)

const destroyBulk = (client, {
  bulkId,
  recipientId,
}) => (
  client.bulkAnticipations.destroy({
    id: bulkId,
    recipientId,
  })
)

const enhanced = compose(
  connect(mapStateToProps),
  withRouter
)

const getErrorMessage = pipe(
  path(['response', 'errors']),
  head,
  prop('message')
)

const initialState = {
  automaticTransfer: true,
  bulkAnticipationStatus: null,
  bulkId: null,
  feesValues: {},
  finalValue: 0,
  limits: {},
  requestedAmount: 0,
}

class Anticipation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...initialState,
      timeframe: 'start',
      paymentDate: moment().add(1, 'day'),
    }

    this.createBulk = this.createBulk.bind(this)
    this.updateBulk = this.updateBulk.bind(this)
    this.confirmBulk = this.confirmBulk.bind(this)
    this.destroyBulk = this.destroyBulk.bind(this)
  }

  componentDidMount () {
    const {
      timeframe,
      paymentDate,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    getAnticipationLimits(client, {
      recipientId,
      timeframe,
      payment_date: paymentDate,
    })
      .then(response => this.setState({
        error: null,
        limits: {
          ...response,
          maxValue: calculateMaxLimit(response),
          minValue: calculateMinLimit(response),
        },
      }))
      .catch(pipe(getErrorMessage, error => this.setState({
        error,
      })))
  }

  componentWillUnmount () {
    const {
      status,
      bulkId,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    if (status !== 'pending') {
      this.destroyBulk(client, {
        bulkId,
        recipientId,
      })
    }
  }

  createBulk () {
    const {
      automaticTransfer,
      paymentDate,
      requestedAmount,
      timeframe,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    createBulk(client, {
      automaticTransfer,
      paymentDate,
      recipientId,
      requestedAmount,
      timeframe,
    })
      .then(({
        anticipation_fee: anticipationFee,
        fee,
        fraud_coverage_fee: fraudCovarageFee,
        id,
        status,
      }) => (
        this.setState({
          bulkId: id,
          error: null,
          feesValues: {
            anticipation: anticipationFee,
            fraud: fraudCovarageFee,
            otherFee: fee,
          },
          bulkAnticipationStatus: status,
        })
      ))
      .catch(pipe(getErrorMessage, error => this.setState({
        error,
      })))
  }

  updateBulk () {
    const {
      automaticTransfer,
      paymentDate,
      requestedAmount,
      timeframe,
      bulkId,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    this.setState({
      requestedAmount: 40000000,
    }, () => {
      updateBulk(client, {
        automaticTransfer,
        bulkId,
        paymentDate,
        recipientId,
        requestedAmount,
        timeframe,
      })
        .then(({
          anticipation_fee: anticipationFee,
          fee,
          fraud_coverage_fee: fraudCovarageFee,
          status,
        }) => (
          this.setState({
            feesValues: {
              otherFee: fee,
              anticipation: anticipationFee,
              fraud: fraudCovarageFee,
            },
            bulkAnticipationStatus: status,
          })
        ))
        .catch(pipe(getErrorMessage, error => this.setState({
          error,
        })))
    })
  }

  confirmBulk () {
    const {
      bulkId,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    confirmBulk(client, {
      bulkId,
      recipientId,
    })
      .then(({ status }) => this.setState({
        ...initialState,
        bulkAnticipationStatus: status,
      }))
      .catch(pipe(getErrorMessage, error => this.setState({
        error,
      })))
  }

  destroyBulk () {
    const {
      bulkId,
    } = this.state

    const {
      client,
      match: {
        params: {
          id: recipientId,
        },
      },
    } = this.props

    destroyBulk(client, {
      bulkId,
      recipientId,
    })
      .then(() => this.setState(initialState))
      .catch(pipe(getErrorMessage, error => this.setState({
        error,
      })))
  }

  render () {
    const {
      bulkAnticipationStatus,
      error,
      feesValues,
      finalValue,
      limits,
      paymentDate,
      requestedAmount,
    } = this.state

    return (
      <div>
        olar
        <p>Valor requisitado: {requestedAmount}</p>
        <p>Valor Máximo: {limits.maxValue}</p>
        <p>Valor Minimo: {limits.minValue}</p>
        <p>Taxas: {feesValues.otherFee} e {feesValues.anticipation}</p>
        <p>Valor final: {finalValue}</p>
        <p>Status: {bulkAnticipationStatus}</p>
        <p>Data: {paymentDate.format('L')}</p>

        <input
          value={this.state.requestedAmount}
          onChange={e => this.setState({
            requestedAmount: Number(e.target.value),
          })}
        />

        <div>{error}</div>

        <button onClick={this.createBulk}>CRIAR BULKKKK</button>
        <button onClick={this.updateBulk}>UPDATE BULKKKK</button>
        <button onClick={this.confirmBulk}>Confirmar BULKKKK</button>
        <button onClick={this.destroyBulk}>Cancelar Bulk</button>
      </div>
    )
  }
}

Anticipation.propTypes = {
  client: PropTypes.shape({
    bulkAnticipations: PropTypes.shape({
      limits: PropTypes.func,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      recipientId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default enhanced(Anticipation)
