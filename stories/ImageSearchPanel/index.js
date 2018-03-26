
import { checkA11y } from '@storybook/addon-a11y'
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageSearchPanel from '../../client/components/ImageSearchPanel'
import Container from './Container'

storiesOf('ImageSearchPanel', module)
  .addDecorator(checkA11y)
  .add('default filters', () => (
    <Container>
      <ImageSearchPanel />
    </Container>
  ))
