import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoCircle from '../logo/LogoCircle'
import Button from '../Button/Button'
import ProgressBar from '../ProgressBar/ProgressBar'
import './Header.css'

export default class Header extends Component {
  static propTypes = {
    showNav: PropTypes.bool,
    onFlipClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onLogoClick: PropTypes.func.isRequired,
    percentComplete: PropTypes.number.isRequired,
  }
  static defaultProps = {
    showNav: true,
  }

  render() {
    const {
      showNav,
      onFlipClick,
      onNextClick,
      onLogoClick,
      percentComplete,
    } = this.props

    return (
      <header className="header--header">
        <ProgressBar width="100%" percent={percentComplete} height={2} />
        <div className="header--header-row">
          <LogoCircle onClick={onLogoClick} />
          <span className="header--header-text">
            Front End Interview Handbook
          </span>
        </div>
        {showNav && (
          <div className="header--header-buttons">
            <Button type="flip" onClick={onFlipClick} />
            <Button type="next" onClick={onNextClick} />
          </div>
        )}
      </header>
    )
  }
}
