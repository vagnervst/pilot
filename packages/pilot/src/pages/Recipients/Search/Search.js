import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { compose } from 'ramda'

import RecipientSelection from '../../../containers/RecipientSelection'

import {
  receiveSearch,
  requestSearch,
} from './actions'
import { requestLogout } from '../../Account/actions'

const mapStateToProps = ({
  account: { client },
  transactions: { loading, query },
}) => ({ client, loading, query })

const mapDispatchToProps = dispatch => ({
  onRequestSearch: (query) => {
    dispatch(requestSearch(query))
  },
  onReceiveSearch: ({ query }) => {
    dispatch(receiveSearch({ query }))
  },
  onRequestSearchFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate('transactions'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

class RecipientSearch extends Component {
  constructor (props) {
    super(props)

    this.requestData = this.requestData.bind(this)
  }

  requestData (query) {
    this.props.onRequestSearch({ query })

    return this.state.client
      .transactions
      .search(query)
      .then((res) => {
        this.setState(res)
        this.props.onReceiveSearch(res)
      })
      .catch((error) => {
        this.props.onRequestSearchFail(error)
      })
  }

  render () {
    const pagination = {}

    return (
      <RecipientSelection
        onPageChange={action('page-change')}
        onSearch={action('search')}
        onSelect={action('recipient-selection')}
        pagination={pagination}
        recipients={recipients}
      />
    )
  }
}

RecipientSearch.propTypes = {
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  onRequestSearchFail: PropTypes.func.isRequired,
}

export default enhanced(RecipientSearch)
