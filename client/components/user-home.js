import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SearchForm from './SearchForm'
import GifDisplay from './GifDisplay'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <h3>Welcome</h3>
      <SearchForm />
      <GifDisplay />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
