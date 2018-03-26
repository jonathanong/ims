
import { checkA11y } from '@storybook/addon-a11y'
import { storiesOf } from '@storybook/react'
import React from 'react'

import '../../client/ui/index.css'

storiesOf('UI', module)
  .addDecorator(checkA11y)
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
  .add('Forms', () => (
    <form style={{
      padding: '1rem'
    }}>
      <fieldset>
        <legend>This is a sample fieldset</legend>
        <div className='control-group'>
          <label htmlFor='search'>Please search in this text box</label>
          <input type='search' name='search' id='search' placeholder='Search here' required />
        </div>

        <div className='control-group'>
          <label htmlFor='email'>Please type your email in this text box</label>
          <input type='email' name='email' id='email' placeholder='Email Address' required />
        </div>

        <div className='control-group'>
          <label htmlFor='password'>Please type your password in this text box</label>
          <input type='password' name='password' id='password' placeholder='Password' required />
        </div>

        <label className='checkbox-group'>
          <input type='checkbox' defaultChecked />
          <span>Check me please.</span>
        </label>

        <label className='checkbox-group'>
          <input type='checkbox' />
          <span>Check me please.</span>
        </label>

        <label className='checkbox-group'>
          <input type='checkbox' />
          <span>Check me please.</span>
        </label>
      </fieldset>
    </form>
  ))
