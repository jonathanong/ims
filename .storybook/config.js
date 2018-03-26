import { configure } from '@storybook/react'

function loadStories () {
  require('../client/stories')
}

configure(loadStories, module)
