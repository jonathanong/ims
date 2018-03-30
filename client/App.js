
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import React from 'react'

import TopNav from './components/TopNav'

export const App = () => (
  <BrowserRouter>
    <TopNav />
  </BrowserRouter>
)

export default hot(module)(App)
