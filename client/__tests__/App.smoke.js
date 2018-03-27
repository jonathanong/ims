
import React from 'react'
import { App } from '../App'
import renderer from 'react-test-renderer'

it('should render', () => {
  const tree = renderer
    .create(<App />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
