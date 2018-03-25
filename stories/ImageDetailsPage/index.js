
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageDetailsPage from '../../client/components/ImageDetailsPage'
import Container from './Container'
import '../../client/ui/index.css'
import {
  GOOGLE_LOGO_IMAGE,
  ANNA_KENDRICK_IMAGE
} from './fixtures'

storiesOf('ImageDetailsPage', module)
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
