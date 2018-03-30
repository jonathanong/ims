
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './index.css'

export default class ImageDetailsPage extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired
  }

  renderMainImages () {
    const { image } = this.props

    if (image.is_opaque) {
      return (
        <a className={styles.imageWrapper} href={image.source_url} target='_blank'>
          <img src={image.source_url} alt={image.title} />
        </a>
      )
    }

    // show image with multiple backgrounds
    return (
      <Fragment>
        <a className={styles.imageWrapperLight} href={image.source_url} target='_blank'>
          <img src={image.source_url} alt={image.title} />
        </a>

        <a className={styles.imageWrapperDark} href={image.source_url} target='_blank'>
          <img src={image.source_url} alt={image.title} />
        </a>
      </Fragment>
    )
  }

  renderAsideDetails () {
    const { image } = this.props

    return (
      <aside className={styles.asideDetails}>
        <h6>Metadata</h6>
        <div className={styles.asideDetailsTableWrapper}>
          <table>
            <tbody>
              <tr>
                <td>Width</td>
                <td>{image.width}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{image.height}</td>
              </tr>
              <tr>
                <td>Format</td>
                <td>{image.format.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Color Space</td>
                <td>{image.space.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Has Alpha Channel</td>
                <td>{image.has_alpha ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Is Transparent</td>
                <td>{image.is_opaque ? 'No' : 'Yes'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    )
  }

  renderAsideTags () {
    const { tags } = this.props.image

    return (
      <aside className={styles.asideTags}>
        <h6>Tags</h6>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              {tag.name}
            </li>
          ))}
        </ul>
      </aside>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          {this.renderMainImages()}
        </main>

        <div className={styles.asides}>
          {this.renderAsideDetails()}
          {this.renderAsideTags()}
        </div>
      </div>
    )
  }
}
