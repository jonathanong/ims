
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { supported_image_formats } from '../../../isomorphic/constants.json'
import styles from './index.css'

export default class ImageSearchPanel extends PureComponent {
  static propTypes = {
    formats: PropTypes.array,
    onFormatChange: PropTypes.func
  }

  renderFilterFormats () {
    const { formats, onFormatChange } = this.props

    return (
      <fieldset>
        <legend>Image Formats</legend>

        <label className='checkbox-group'>
          <input name='all' type='checkbox' checked={formats.length === supported_image_formats.length} onChange={onFormatChange} />
          <span>All</span>
        </label>

        {supported_image_formats.map((format) => (
          <label className='checkbox-group' key={format}>
            <input name={format} type='checkbox' checked={formats.includes(format)} onChange={onFormatChange} />
            <span>{format.toUpperCase()}</span>
          </label>
        ))}
      </fieldset>
    )
  }

  render () {
    return (
      <form className={styles.container}>
        {this.renderFilterFormats()}
      </form>
    )
  }
}
