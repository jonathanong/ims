import { configure, addDecorator } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'

addDecorator(checkA11y)

function loadStories () {
  require('../client/stories')
}

configure(loadStories, module)
