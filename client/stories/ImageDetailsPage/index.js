
import { checkA11y } from '@storybook/addon-a11y'
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageDetailsPage from '../../components/ImageDetailsPage'
import Container from './Container'
import {
  GOOGLE_LOGO_IMAGE,
  ANNA_KENDRICK_IMAGE
} from '../fixtures/images'

storiesOf('ImageDetailsPage', module)
  .addDecorator(checkA11y)
  .add('w/ Google Logo', () => (
    <Container>
      <ImageDetailsPage image={GOOGLE_LOGO_IMAGE} />
    </Container>
  ))
  .add('w/ Anna Kendrick Photo', () => (
    <Container>
      <ImageDetailsPage image={ANNA_KENDRICK_IMAGE} />
    </Container>
  ))
