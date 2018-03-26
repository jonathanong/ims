
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uniq from 'lodash/uniq'

import { supported_image_formats } from '../../isomorphic/constants.json'

export default class Container extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    formats: []
  }

  onFormatChange = (e) => {
    const { target } = e
    if (target.name === 'all') {
      this.setState({
        formats: supported_image_formats
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

  render () {
    return React.cloneElement(this.props.children, {
      ...this.state,
      onFormatChange: this.onFormatChange
    })
  }
}
