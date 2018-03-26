
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './index.css'

export default class ImageGridElement extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired
  }

  renderImages () {
    const { image } = this.props

    if (image.is_opaque) {
      return (
        <div className={styles.image} style={{
          backgroundImage: `url(${image.source_url})`
        }} />
      )
    }

    // show image with multiple backgrounds
    return (
      <Fragment>
        <div className={styles.imageLight} style={{
          backgroundImage: `url(${image.source_url})`
        }} />

        <div className={styles.imageDark} style={{
          backgroundImage: `url(${image.source_url})`
        }} />
      </Fragment>
    )
  }

  render () {
    const { image } = this.props

    return (
      <a className={styles.container} href='#'>
        <div className={styles.imageWrapper}>
          {this.renderImages()}
        </div>
        <div className={styles.details}>
          <h6>{image.title}</h6>
        </div>
      </a>
    )
  }
}
