
import { BrowserRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import React from 'react'

import TopNav from '../../components/TopNav'

storiesOf('TopNav', module)
  .add('guest', () => (
    <BrowserRouter>
      <TopNav />
    </BrowserRouter>
  ))
