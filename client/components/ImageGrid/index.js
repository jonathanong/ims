
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImageGridElement from './ImageGridElement'
import styles from './index.css'

export default class ImageGrid extends PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired
  }

  render () {
    const { images } = this.props

    return (
      <div className={styles.container}>
        {images.map((image) => <ImageGridElement key={image.id} image={image} />)}
      </div>
    )
  }
}
