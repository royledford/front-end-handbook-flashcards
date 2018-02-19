import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import FaRepeat from 'react-icons/lib/fa/repeat'
import './Button.css'

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['next', 'flip']),
    onClick: PropTypes.func,
  }
  static defaultProps = {
    type: 'refresh',
    onClick: () => {},
  }

  render() {
    const buttonIcon =
      this.props.type === 'next' ? <FaArrowRight /> : <FaRepeat />

    return (
      <button className="button--wrap" onClick={this.props.onClick}>
        {buttonIcon}
      </button>
    )
  }
}
