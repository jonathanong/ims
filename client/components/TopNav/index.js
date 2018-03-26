
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.css'

export default class TopNav extends PureComponent {
  render () {
    return (
      <div className={styles.container}>
        <Link className={styles.logo} to='/'>IMS</Link>
      </div>
    )
  }
}
