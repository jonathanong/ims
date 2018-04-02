
import { Switch, Route } from 'react-router'
import Loadable from 'react-loadable'
import React from 'react'

const loading = () => null

const ImageRoute = Loadable({
  loader: () => import(/* webpackChunkName: "route-image" */ './routes/Image'),
  loading
})

export default () => (
  <Switch>
    <Route exact path='/images/:id' component={ImageRoute} />
  </Switch>
)
