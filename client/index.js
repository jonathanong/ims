
import 'ims-storybook/ui/index.css'
import './polyfills'
import onError from './on-error'

import(/* webpackChunkName: "render" */ './render').catch(onError)
