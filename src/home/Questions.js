import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipCard from '../common/FlipCard/FlipCard'
import Tutorial from './Tutorial'
import './Questions.css'

export default class Questions extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool.isRequired,
    showTutorial: PropTypes.bool.isRequired,
    onTutorialClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      question,
      answer,
      showAnswer,
      showTutorial,
      onTutorialClick,
    } = this.props

    return (
      <React.Fragment>
        {showTutorial && <Tutorial onClick={onTutorialClick} />}
        <div className="questions--wrap">
          <div className="questions--content">
            <FlipCard
              frontText={question}
              backText={answer}
              showAnswer={showAnswer}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
