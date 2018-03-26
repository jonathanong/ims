
import { checkA11y } from '@storybook/addon-a11y'
import { BrowserRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import React from 'react'

import TopNav from '../../components/TopNav'

storiesOf('TopNav', module)
  .addDecorator(checkA11y)
  .add('guest', () => (
    <BrowserRouter>
      <TopNav />
    </BrowserRouter>
  ))
