import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardSection,
  CheckboxGroup,
  Col,
  Row,
} from 'former-kit'

import Form from 'react-vanilla-form'

import {
  anyPass,
  equals,
  isEmpty,
  isNil,
} from 'ramda'

import style from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      query: props.query,
    }

    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
  }

  componentWillReceiveProps ({ query }) {
    if (!equals(query, this.state.query)) {
      this.setState({ query })
    }
  }

  handleFiltersSubmit (filters) {
    this.setState({
      collapsed: true,
    })

    this.props.onChange(filters)
  }

  handleFiltersChange (query) {
    this.setState({ query })
  }

  renderToolbar () {
    const {
      query: originalFilters,
      onClear,
      children,
      t,
    } = this.props

    const {
      query: currentFilters,
    } = this.state

    const filtersChanged = !equals(originalFilters, currentFilters)

    return (
      <CardActions>
        {children}
        <div className={style.spacer} />
        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          onClick={onClear}
          fill="outline"
          disabled={this.props.disabled}
        >
          {t('components.filter.reset')}
        </Button>

        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          disabled={!filtersChanged || this.props.disabled}
          type="submit"
          fill="gradient"
        >
          {t('components.filter.apply')}
        </Button>
      </CardActions>
    )
  }

  renderOptions () {
    const {
      collapsed,
    } = this.state

    const {
      options,
    } = this.props

    if (isNilOrEmpty(options) || collapsed) {
      return null
    }

    return (
      <CardContent>
        <CardSection>
          <CardContent>
            <fieldset name="properties">
              <Row flex>
                {options.map(({ name, items, key }) => (
                  <Col key={name}>
                    <div className={style.filtersTitle}>
                      {name}
                    </div>
                    <CheckboxGroup
                      columns={items.length > 6 ? 2 : 1}
                      disabled={this.props.disabled}
                      name={key}
                      options={items}
                    />
                  </Col>
                ))}
              </Row>
            </fieldset>
          </CardContent>
        </CardSection>
      </CardContent>
    )
  }

  render () {
    return (
      <Card className={style.allowOverflow}>
        <Form
          data={this.state.query}
          onChange={this.handleFiltersChange}
          onSubmit={this.handleFiltersSubmit}
        >
          {this.renderToolbar()}
          {this.renderOptions()}
        </Form>
      </Card>
    )
  }
}

Filters.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  query: PropTypes.object, // eslint-disable-line
  t: PropTypes.func.isRequired,
}

Filters.defaultProps = {
  options: [],
  query: {},
  disabled: false,
}

export default Filters
