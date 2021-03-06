
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.css'

export default class ImageSearchPanel extends PureComponent {
  static propTypes = {
    validFormats: PropTypes.array,
    formats: PropTypes.array,
    onFormatChange: PropTypes.func,
    validTags: PropTypes.array, // all possible valid tags
    tags: PropTypes.array, // currently selected tags' ID
    onTagChange: PropTypes.func
  }

  renderFilterFormats () {
    const { validFormats, formats, onFormatChange } = this.props

    return (
      <fieldset>
        <legend>Image Formats</legend>

        <label className='checkbox-group'>
          <input name='all' type='checkbox' checked={formats.length === validFormats.length} onChange={onFormatChange} />
          <span>All</span>
        </label>

        {validFormats.map((format) => (
          <label className='checkbox-group' key={format}>
            <input name={format} type='checkbox' checked={formats.includes(format)} onChange={onFormatChange} />
            <span>{format.toUpperCase()}</span>
          </label>
        ))}
      </fieldset>
    )
  }

  renderFilterTags () {
    const { validTags, tags, onTagChange } = this.props

    return (
      <fieldset>
        <legend>Tags</legend>

        {validTags.map((tag) => (
          <label className='checkbox-group' key={tag.id}>
            <input name={`tag-${tag.id}`} type='checkbox' checked={tags.includes(tag.id)} onChange={onTagChange} />
            <span>{tag.name}</span>
          </label>
        ))}
      </fieldset>
    )
  }

  render () {
    return (
      <form className={styles.container}>
        {this.renderFilterFormats()}
        {this.renderFilterTags()}
      </form>
    )
  }
}
