import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './About.css'

export default class About extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="about--wrap">
        <h1 className="about--leadin">
          Front End Interview Handbook Flash Cards
        </h1>
        <p className="about--text">
          Quiz yourself on Front-end interview topics.
        </p>
        <button className="about--button" onClick={this.props.onClick}>
          Get Started
        </button>
      </div>
    )
  }
}
