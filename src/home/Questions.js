import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipCard from '../common/FlipCard/FlipCard'
import './Questions.css'

export default class Questions extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { onClick, question, answer, showAnswer } = this.props

    return (
      <div className="questions--wrap" onClick={onClick}>
        <div className="questions--content">
          <FlipCard
            frontText={question}
            backText={answer}
            showAnswer={showAnswer}
          />
        </div>
      </div>
    )
  }
}
