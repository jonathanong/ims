
import TopNav from 'ims-storybook/components/TopNav'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import React from 'react'

export const App = () => (
  <BrowserRouter>
    <TopNav />
  </BrowserRouter>
)

export default hot(module)(App)
