
import { storiesOf } from '@storybook/react'
import React from 'react'

import '../client/ui/index.css'

storiesOf('UI', module)
  .add('Typography', () => (
    <div style={{
      padding: '1rem'
    }}>
      <h1>Header h1</h1>
      <h2>Header h2</h2>
      <h3>Header h3</h3>
      <h4>Header h4</h4>
      <h5>Header h5</h5>
      <h6>Header h6</h6>

      <hr />

      <p>Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. </p>

      <hr />

      <p>Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. Some paragraph. </p>

      <ul>
        <li>An item in an unordered list.</li>
        <li>An item in an unordered list.</li>
        <li>An item in an unordered list.</li>
        <li>An item in an unordered list.</li>
      </ul>

      <ol>
        <li>An item in an ordered list.</li>
        <li>An item in an ordered list.</li>
        <li>An item in an ordered list.</li>
        <li>An item in an ordered list.</li>
      </ol>
    </div>
  ))
