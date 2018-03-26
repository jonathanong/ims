
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageSearchPanel from '../../client/components/ImageSearchPanel'
import Container from './Container'

storiesOf('ImageSearchPanel', module)
  .add('default filters', () => (
    <Container>
      <ImageSearchPanel />
    </Container>
  ))
