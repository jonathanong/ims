
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import TopNav from './components/TopNav'
import ImageRoute from './routes/Image'
import store from './store'

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <TopNav />
        <Switch>
          <Route exact path='/images/:id' component={ImageRoute} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
)

export default hot(module)(App)
