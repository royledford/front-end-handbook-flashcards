import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoCircle from '../logo/LogoCircle'
import Button from '../Button/Button'
import './Header.css'

export default class Header extends Component {
  static propTypes = {
    onFlipClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onLogoClick: PropTypes.func.isRequired,
    onTitleClick: PropTypes.func.isRequired,
  }

  render() {
    const { onFlipClick, onNextClick, onLogoClick, onTitleClick } = this.props

    return (
      <header className="header--header">
        <div className="header--header-row">
          <LogoCircle onClick={onLogoClick} />
          <span className="header--header-text">
            Front End Interview Handbook
          </span>
        </div>
        <div className="header--header-buttons">
          <Button type="flip" onClick={onFlipClick} />
          <Button type="next" />
        </div>
      </header>
    )
  }
}
