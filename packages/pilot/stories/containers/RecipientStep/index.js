import React from 'react'
import legalQuantity from '../../../src/models/recipientLegalPartnersQuantity'
import RecipientStep from '../../../src/containers/RecipientStep'

const RecipientStepContainer = () => (
  // montar um state aqui
  <RecipientStep
    numbers={legalQuantity.numbers}
    value="string"
  />
)

export default RecipientStepContainer
