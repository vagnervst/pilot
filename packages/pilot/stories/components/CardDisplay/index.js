import React from 'react'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info24.svg'

import Section from '../../Section'
import CardDisplay from '../../../src/components/CardDisplay'

const CardDisplayExample = () => (
  <Section>
    <Grid>
      <Row stretch>
        <Col palm={12} tablet={6} desk={3}>
          <CardDisplay
            title="Random number"
            value={1234}
            color="#37cc9a"
            subtitle={
              <span>
                Capturado em 10/03/2018 às 14:15h
              </span>
            }
          />
        </Col>

        <Col palm={12} tablet={6} desk={3}>
          <CardDisplay
            title="Data"
            value="20/02/2000"
            color="#ff796f"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default CardDisplayExample
