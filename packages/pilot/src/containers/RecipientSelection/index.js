import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Col,
  Grid,
  Input,
  Pagination,
  Row,
  Table,
} from 'former-kit'

import getRecipientSelectionColumns from './recipientSelectionColumns'
import style from './style.css'

class RecipientSelection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
    }

    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearchFieldChange (event) {
    this.setState({
      search: event.target.value,
    })
  }

  handleSearch () {
    this.props.onSearch(this.state.search)
  }

  render () {
    const {
      ofLabel,
      onPageChange,
      onSelect,
      pagination,
      searchPlaceholder,
      recipients,
    } = this.props

    const { search } = this.state

    return (
      <Grid>
        <Row flex>
          <Col align="start">
            <Input
              className={style.search}
              onChange={this.handleSearchFieldChange}
              placeholder={searchPlaceholder}
              value={search}
            />
            <Button
              fill="outline"
              relevance="low"
              onClick={this.handleSearch}
            >
              {'search'}
            </Button>
          </Col>
          <Col align="end">
            <Pagination
              currentPage={pagination.offset}
              totalPages={pagination.total}
              onPageChange={onPageChange}
              strings={{
                of: ofLabel,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              columns={getRecipientSelectionColumns(onSelect)}
              rows={recipients}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

RecipientSelection.propTypes = {
  ofLabel: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bank_account: PropTypes.shape({
        bank_code: PropTypes.string.isRequired,
        agency: PropTypes.string.isRequired,
        legal_name: PropTypes.string.isRequired,
        account: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
}

export default RecipientSelection
