import React, { Fragment } from 'react'
import {
  Button,
  Card,
  Popover,
  PopoverMenu,
} from 'former-kit'
import ReportCard from '../../../src/components/ReportCard'
import moment from 'moment'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import ReprocessIcon from 'emblematic-icons/svg/Reprocess32.svg'
import { action } from '@storybook/addon-actions'

const items = [
  {
    title: 'PDF',
    action: action('pdf'),
  },
  {
    title: 'Excel',
    action: action('excel'),
  },
  {
    title: 'csv',
    action: action('csv'),
  },
]

const report = {
  id: 'rep_fjh9eevpv00031uo7st5nscqc',
  status: 'ready',
  type: 'plans',
  data: {
    company_id: '58ebcf091173c91400a0b05d',
    created_at: '2018-03-11T00:00:00.000Z',
    updated_at: '2018-03-11T00:00:00.000Z',
  },
  url: 'http://s3.amazonaws.com/tract-live/public/plans_cjh9eew06000012rxte25jpkr.json?AWSAccessKeyId=AKIAIUD2DGLYBPF7X3FA&Expires=1526493233&Signature=ce4THQeQV%2Ft%2BDPUnbTHSYo51mCI%3D',
  created_at: '2018-05-16T17:47:02.035Z',
  updated_at: '2018-05-16T17:47:02.596Z',
}

const renderActions = (report) => {
  if (report.status === 'canceled') {
    return (
      <Fragment>
        <Button
          fill="outline"
          icon={<TrashIcon width={16} height={16} />}
          key="Item 1"
          onClick={action('delete')}
          size="default"
        />

        <Button
          fill="outline"
          icon={<ReprocessIcon width={16} height={16} />}
          key="Item 1"
          onClick={action('reprocess')}
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
        onClick={action('delete')}
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
            onClick={action('download')}
            size="default"
          />
        </Popover>
      </Fragment>
    </Fragment>
  )
}

class ReportCardState extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      ...report,
      expandedCard: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      expandedCard: !this.state.expandedCard,
    })
  }

  render () {
    return (
     <Card>
       <ReportCard
         actions={renderActions(report)}
         cardExpanded={this.state.expandedCard}
         report={report}
         title="Relatório financeiro"
         subTitle={
           <div>
             Período: {moment(report.data.created_at).format('DD/MM/YYYY')}
             até {moment(report.data.updated_at).format('DD/MM/YYYY')} |
             Criado: {moment(report.created_at).format('DD/MM/YYYY')}
+          </div>
         }
       />
     </Card>
    )
  }
}

export default ReportCardState
