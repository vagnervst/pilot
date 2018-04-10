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

import getColumnTranslator from '../../formatters/columnTranslator'
import getRecipientSelectionColumns from './recipientSelectionColumns'
import style from './style.css'

class RecipientSelection extends Component {
  constructor (props) {
    super(props)
    const { t } = this.props

    const columnsTranslator = getColumnTranslator(t)

    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderSelectColumn = this.renderSelectColumn.bind(this)

    this.state = {
      search: '',
      columns: columnsTranslator(getRecipientSelectionColumns(t, this.renderSelectColumn)),
    }
  }

  handleSearchFieldChange (event) {
    this.setState({
      search: event.target.value,
    })
  }

  handleSearch () {
    this.props.onSearch(this.state.search)
  }

  renderSelectColumn (item) {
    const { onSelect, t } = this.props

    return (
      <Button
        fill="outline"
        onClick={() => onSelect(item)}
      >
        {t('select')}
      </Button>
    )
  }
  render () {
    const {
      onPageChange,
      pagination,
      recipients,
      t,
    } = this.props

    const {
      search,
      columns,
    } = this.state

    return (
      <Grid>
        <Row flex>
          <Col align="start">
            <Input
              className={style.search}
              onChange={this.handleSearchFieldChange}
              placeholder={t('filter_by_name_or_legal_name')}
              value={search}
            />
            <Button
              fill="outline"
              relevance="low"
              onClick={this.handleSearch}
            >
              {t('search')}
            </Button>
          </Col>
          <Col align="end">
            <Pagination
              currentPage={pagination.offset}
              totalPages={pagination.total}
              onPageChange={onPageChange}
              strings={{
                of: t('of'),
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              columns={columns}
              rows={recipients}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

RecipientSelection.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      bank_account: PropTypes.shape({
        account: PropTypes.string.isRequired,
        agency: PropTypes.string.isRequired,
        bank_code: PropTypes.string.isRequired,
        legal_name: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
}

export default RecipientSelection
