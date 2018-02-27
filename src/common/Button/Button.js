import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import FaRepeat from 'react-icons/lib/fa/repeat'
import './Button.css'

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['next', 'flip', 'back']),
    onClick: PropTypes.func,
    style: PropTypes.object,
  }
  static defaultProps = {
    type: 'refresh',
    onClick: () => {},
    style: {},
  }

  render() {
    const { type } = this.props
    let buttonIcon

    switch (type) {
      case 'next':
        buttonIcon = <FaArrowRight />
        break
      case 'flip':
        buttonIcon = <FaRepeat />
        break
      default:
        buttonIcon = <FaArrowLeft />
    }

    return (
      <button
        className="button--wrap"
        style={this.props.style}
        onClick={this.props.onClick}>
        {buttonIcon}
      </button>
    )
  }
}
