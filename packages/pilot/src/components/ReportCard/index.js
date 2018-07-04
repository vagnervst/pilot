import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Legend,
  Popover,
  PopoverMenu,
} from 'former-kit'
import moment from 'moment'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import ReprocessIcon from 'emblematic-icons/svg/Reprocess32.svg'
import reportStatusLegend from '../../models/reportStatusLegend'

const items = [
  {
    title: 'PDF',
  },
  {
    title: 'Excel',
  },
  {
    title: 'csv',
  },
]

const renderActions = (report) => {
  if (report.status === 'canceled') {
    return (
      <Fragment>
        <Button
          fill="outline"
          icon={<TrashIcon width={16} height={16} />}
          key="Item 1"
          onClick={() => null}
          size="default"
        />

        <Button
          fill="outline"
          icon={<ReprocessIcon width={16} height={16} />}
          key="Item 1"
          onClick={() => null}
          size="default"
        />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Button
        fill="outline"
        icon={<TrashIcon width={16} height={16} />}
        key="Item 1"
        onClick={() => null}
        size="default"
      />
      <Fragment>
        <Popover
          content={
            <Fragment>
              <div>
                <strong>Teste</strong>
              </div>
              <PopoverMenu items={items} />
            </Fragment>
          }
        >
          <Button
            fill="outline"
            icon={<DownloadIcon width={16} height={16} />}
            onClick={() => null}
            size="default"
          />
        </Popover>
      </Fragment>
    </Fragment>
  )
}

class ReportCard extends React.Component {
  constructor () {
    super()
    this.handleClickItem = this.handleClickItem.bind(this)
  }

  handleClickItem () {
    const {
      report,
      onClick,
    } = this.props

    onClick(report.id)
  }

  render () {
    const {
      cardExpanded,
      report,
      subTitle,
      title,
    } = this.props
    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            actions={renderActions(report)}
            collapsed={!cardExpanded}
            icon={
              <Legend
                color={reportStatusLegend[report.status].color}
                acronym={reportStatusLegend[report.status].acronym}
                hideLabel
              />
            }
            onClick={() => null}
            subTitle={subTitle}
            title={title}
          />
          {cardExpanded &&
            <div>
              <CardContent>
                <CardSection>
                  Filtros
                  <p>Status: {report.status}</p>
                </CardSection>
              </CardContent>
            </div>
            }
        </CardSection>
      </CardContent>
    )
  }
}

ReportCard.propTypes = {
  cardExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  report: PropTypes.shape({
    data: PropTypes.shape({
      company_id: PropTypes.string,
      created_at: PropTypes.instanceOf(moment),
      updated_at: PropTypes.instanceOf(moment),
    }).isRequired,
    object: PropTypes.string,
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

