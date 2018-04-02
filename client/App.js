
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import React from 'react'

import TopNav from './components/TopNav'
import store from './store'

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <TopNav />
    </BrowserRouter>
  </Provider>
)

export default hot(module)(App)
