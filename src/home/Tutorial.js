import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button/Button'
import './Tutorial.css'

export default class Tutorial extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="tutorial--bg" onClick={this.props.onClick}>
        <div className="tutorial--bg-col">
          <Button type="flip" onClick={() => {}} />
          <p className="tutorial--text">
            Click the Flip Icon to see the answer, click again to see the
            question.
          </p>

          <Button type="next" onClick={() => {}} />
          <p className="tutorial--text">
            Click the Next Icon to go to the next question.
          </p>
          <button onClick={this.props.onClick}>Let's Go</button>
        </div>
      </div>
    )
  }
}
