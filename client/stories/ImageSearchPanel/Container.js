
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uniq from 'lodash/uniq'

import tags from '../fixtures/tags'

const validTags = tags.sort((a, b) => a.name.localeCompare(b.name))
const validFormats = [
  'png',
  'jpeg',
  'webp',
  'svg',
  'gif'
]

export default class Container extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    formats: [],
    tags: []
  }

  onFormatChange = (e) => {
    const { target } = e
    if (target.name === 'all') {
      this.setState({
        formats: validFormats
      })
      return
    }

    let formats = this.state.formats.slice()
    if (target.checked) formats = formats.concat(target.name)
    else formats = formats.filter(x => x !== target.name)

    this.setState({
      formats: uniq(formats)
    })
  }

  onTagChange = (e) => {
    const { target } = e
    const id = ~~target.name.replace(/^tag-/, '')
    let tags = this.state.tags.slice()
    if (target.checked) tags = tags.concat(id)
    else tags = tags.filter(x => x !== id)

    this.setState({
      tags: uniq(tags)
    })
  }

  render () {
    return React.cloneElement(this.props.children, {
      validTags,
      validFormats,
      ...this.state,
      onFormatChange: this.onFormatChange,
      onTagChange: this.onTagChange
    })
  }
}
