import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import RecipientListState from './RecipientList'
import RecipientStep from './RecipientStep'
// import { ManualReviewApproveForm, ManualReviewRefuseForm } from './ManualReview/Form'
// import {
//   ManualReviewApproveResult,
//   ManualReviewRefuseResult,
//   ManualReviewErrorResult,
// } from './ManualReview/Result'
// import {
//   ManualReviewStepApproveConfirmation,
//   ManualReviewStepApproveResult,
//   ManualReviewStepRefuseConfirmation,
//   ManualReviewStepRefuseResult,
//   ManualReviewStepResultError,
// } from './ManualReview'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('RecipientStep', () => (
    <RecipientStep />
  ))
  // .add('Manual review approve form', () => (
  //   <ManualReviewApproveForm />
  // ))
  // .add('Manual review refuse form', () => (
  //   <ManualReviewRefuseForm />
  // ))
  // .add('Manual review approve result', () => (
  //   <ManualReviewApproveResult />
  // ))
  // .add('Manual review refuse result', () => (
  //   <ManualReviewRefuseResult />
  // ))
  // .add('Manual review result error', () => (
  //   <ManualReviewErrorResult />
  // ))
  // .add('Manual review step approve confirmation', () => (
  //   <ManualReviewStepApproveConfirmation />
  // ))
  // .add('Manual review step approve result', () => (
  //   <ManualReviewStepApproveResult />
  // ))
  // .add('Manual review step refuse confirmation', () => (
  //   <ManualReviewStepRefuseConfirmation />
  // ))
  // .add('Manual review step refuse result', () => (
  //   <ManualReviewStepRefuseResult />
  // ))
  // .add('Manual review step result error', () => (
  //   <ManualReviewStepResultError />
  // ))
