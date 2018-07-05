import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Legend,
} from 'former-kit'
import moment from 'moment'
import reportStatusLegend from '../../models/reportStatusLegend'

class ReportCard extends React.Component {
  constructor () {
    super()
    this.state = {
      cardExpanded: false,
    }
  }

  render () {
    const {
      report,
      subTitle,
      title,
      actions,
    } = this.props
    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          actions={actions}
          collapsed={!this.state.cardExpanded}
          icon={
            <Legend
              color={reportStatusLegend[report.status].color}
              acronym={reportStatusLegend[report.status].acronym}
              hideLabel
            />
          }
          onClick={
            () => this.setState({ cardExpanded: !this.state.cardExpanded })
          }
          subtitle={subTitle}
          title={title}
        />
        {this.state.cardExpanded &&
          <CardContent>
            Filtros
            <p>Status: {report.status}</p>
          </CardContent>
        }
      </CardSection>
    )
  }
}

ReportCard.propTypes = {
  actions: PropTypes.func.isRequired,
  report: PropTypes.shape({
    data: PropTypes.shape({
      company_id: PropTypes.string,
      created_at: PropTypes.instanceOf(moment),
      updated_at: PropTypes.instanceOf(moment),
    }).isRequired,
    id: PropTypes.string,
    status: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    created_at: PropTypes.instanceOf(moment),
    updated_at: PropTypes.instanceOf(moment),
  }).isRequired,
  subTitle: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default ReportCard

