import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'

import {
//  Card,
//  CardActions,
//  FormInput,
//  CardContent,
//  CardSection,
  Button,
  Col,
  Grid,
  Row,
} from 'former-kit'

import formatDate from '../../formatters/longDate'
import renderStatusLegend from '../../containers/RecipientsList/renderStatusLegend'

const getDefaultColumns = ({ t }) => ([
  {
    title: t('components.models.recipient.status'),
    renderer: renderStatusLegend,
    accessor: ['status'],
    orderable: true,
  },
  {
    title: t('components.models.recipient.id'),
    accessor: ['id'],
    orderable: true,
  },
  {
    title: t('components.models.recipient.bank_account_id'),
    accessor: ['bank_account', 'id'],
    orderable: true,
  },
  {
    title: t('components.models.recipient.bank_account_legal_name'),
    accessor: ['bank_account', 'legal_name'],
    orderable: true,
  },
  {
    title: t('components.models.recipient.bank_account_document_number'),
    accessor: ['bank_account', 'document_number'],
    orderable: true,
  },
  {
    title: t('components.models.recipient.date_created'),
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDate),
  },
  {
    title: '',
    accessor: ['created_at'],
    isAction: false,
    renderer: data => (
      <Row stretch>
        <Col
          desk={6}
          palm={6}
          tablet={6}
          tv={6}
        >
          <Grid>
            <Row>
              <span>
                {t('components.models.recipient.automatic_anticipation_enabled')}
              </span>
              <strong>
                {data.automatic_anticipation_enabled ? 'Sim' : 'Não'}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.automatic_anticipation_1025_delay')}
              </span>
              <strong>
                {JSON.stringify(data.automatic_anticipation_1025_delay)}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.automatic_anticipation_days')}
              </span>
              <strong>
                {data.automatic_anticipation_days}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.automatic_anticipation_type')}
              </span>
              <strong>
                {t(`components.models.recipient.automatic_anticipation_type_of.${data.automatic_anticipation_type}`)}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.anticipatable_volume_percentage')}
              </span>
              <strong>
                {data.anticipatable_volume_percentage}%
              </strong>
            </Row>
            <Row>
              <span>&nbsp;</span>
            </Row>
          </Grid>
        </Col>
        <Col
          desk={6}
          palm={6}
          tablet={6}
          tv={6}
        >
          <Grid>
            <Row>
              <span>
                {t('components.models.recipient.transfer_enabled')}
              </span>
              <strong>
                {data.transfer_enabled ? 'Sim' : 'Não' }
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.transfer_interval')}
              </span>
              <strong>
                {t(`components.models.recipient.transfer_interval_of.${data.transfer_interval}`)}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.transfer_day')}
              </span>
              <strong>
                {data.transfer_day}
              </strong>
            </Row>
            <Row>
              <span>
                {t('components.models.recipient.date_updated')}
              </span>
              <strong>
                {formatDate(data.date_updated)}
              </strong>
            </Row>
            <Row>
              <span>&nbsp;</span>
            </Row>
            <Row>
              <span>&nbsp;</span>
            </Row>
          </Grid>
        </Col>
      </Row>
    ),
  },
  {
    align: 'center',
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => (index)}
      >
        VER DETALHES
      </Button>
    ),
    title: t('components.models.recipient.details'),
    aggregator: null,
    aggregationRenderer: null,
    aggregationTitle: null,
  },
])

export default getDefaultColumns
