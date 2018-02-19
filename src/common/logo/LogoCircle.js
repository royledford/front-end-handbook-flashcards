import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Logo from './Logo'
import './LogoCircle.css'

export default class LogoCircle extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }
  static defaultProps = {
    onClick: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    return (
      <div className="logocircle--wrap" onClick={this.props.onClick}>
        <Logo containerClass="logocircle--logo" />
      </div>
    )
  }
}
