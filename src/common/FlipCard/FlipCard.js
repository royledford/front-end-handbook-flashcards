import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardTitle from './CardTitle'
import CardContent from './CardContent'
import './FlipCard.css'

export default class FlipCard extends Component {
  static propTypes = {
    frontText: PropTypes.string.isRequired,
    backText: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool,
  }
  static defaultProps = {
    showQuestion: true,
  }

  render() {
    const { frontText, backText, showAnswer } = this.props

    const flipCard = showAnswer ? 'flipcard--flipped' : ''

    return (
      <div className="flipcard--container">
        <div className={`flipcard--card-group ${flipCard}`}>
          <div className="flipcard--card flipcard--card-front">
            <CardTitle text="Question" />
            <CardContent text={frontText} />
          </div>

          <div className={`flipcard--card flipcard--card-back`}>
            <CardTitle text="Answer" />
            <CardContent text={backText} />
          </div>
        </div>
      </div>
    )
  }
}
