import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Col,
  Grid,
  Row,
} from 'former-kit'
import IconLock from 'emblematic-icons/svg/Lock32.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'

import ApiKey from '../../../../../components/ApiKey'

const copyToClipBoard = (text) => {
  const textarea = document.createElement('textarea')
  textarea.textContent = text

  textarea.style.opacity = 0
  textarea.style.position = 'absolute'

  document.body.appendChild(textarea)
  textarea.select()

  document.execCommand('copy')
  document.body.removeChild(textarea)
}

class ApiKeyContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      apiKeyCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      apiKeyCollapsed: !this.state.apiKeyCollapsed,
    })
  }

  renderContent () {
    const {
      apiKeys: {
        title,
        keys: {
          apiKey,
          encryptionKey,
        },
      },
      environment,
      t,
    } = this.props

    return (
      <CardContent>
        <p>
          {t('pages.settings.company.card.general.headline.api')}
        </p>
        <Grid>
          {environment === 'test' &&
            <Row stretch>
              <Col
                desk={12}
                palm={12}
                tablet={12}
                tv={12}
              >
                <Alert
                  icon={<IconWarning height={16} width={16} />}
                  type="warning"
                >
                  {t('pages.settings.company.card.general.api_key.test_advise')}
                </Alert>
              </Col>
            </Row>
          }
          <Row stretch>
            <Col
              align="center"
              palm={12}
              tablet={1}
              desk={1}
              tv={1}
            >
              <strong>
                {t(`pages.settings.company.card.general.api_key.${title}`)}
              </strong>
            </Col>
            <Col
              palm={12}
              tablet={6}
              desk={6}
              tv={6}
            >
              <ApiKey
                title="API"
                apiKey={apiKey}
                copyLabel="Copiar"
                onCopy={copyToClipBoard}
              />
            </Col>
            <Col
              palm={12}
              tablet={6}
              desk={5}
              tv={5}
            >
              <ApiKey
                title="Chave De Criptografia"
                apiKey={encryptionKey}
                copyLabel="Copiar"
                onCopy={copyToClipBoard}
              />
            </Col>
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const { t } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.apiKeyCollapsed}
          icon={<IconLock height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.general.subtitle.api')}
          title={t('pages.settings.company.card.general.title.api')}
        />
        {
          !this.state.apiKeyCollapsed ?
            this.renderContent() :
            null
        }
      </CardSection>
    )
  }
}

ApiKeyContainer.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  t: PropTypes.func.isRequired,
}

ApiKeyContainer.defaultProps = {
  apiKeys: null,
}

export default ApiKeyContainer
