import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CardTitle.css'

export default class CardTitle extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="cardtitle--title">
        <h3 className="cardtitle--text">{this.props.text}</h3>
        <hr className="cardtitle--rule" />
      </div>
    )
  }
}
