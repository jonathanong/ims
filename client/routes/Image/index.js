
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ImageDetailsPage from '../../components/ImageDetailsPage'
import { getImage } from '../../store/image'

class ImageRoute extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getImage: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getImage(this.props.match.params.id)
  }

  componentDidUpdate (prevProps) {
    // NOTE: there will be a gap where match.params.id !== image.id
    const { match } = this.props
    if (match.params.id !== prevProps.match.params.id) this.props.getImage(match.params.id)
  }

  render () {
    const { image } = this.props
    if (!image.result) return null

    return <ImageDetailsPage image={image.result} />
  }
}

const mapStateToProps = ({
  image
}) => ({
  image
})

const mapDispatchToProps = (dispatch) => ({
  getImage: getImage(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true
})(ImageRoute)
