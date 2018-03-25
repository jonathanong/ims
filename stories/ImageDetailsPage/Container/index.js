
import PropTypes from 'prop-types'
import React from 'react'

import styles from './index.css'

const Container = ({ children }) => (
  <div className={styles.container}>{children}</div>
)

Container.propTypes = {
  children: PropTypes.any
}

export default Container
