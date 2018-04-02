
import { BrowserRouter } from 'react-router-dom'
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import TopNav from './components/TopNav'
import routes from './routes'
import store from './store'

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <TopNav />
        {routes()}
      </Fragment>
    </BrowserRouter>
  </Provider>
)

export default hot(module)(App)
