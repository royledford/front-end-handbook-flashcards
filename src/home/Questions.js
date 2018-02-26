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
    onClick: PropTypes.func.isRequired,
    onTutorialClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      windowWidth: false,
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
    this.handleWindowSizeChange()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange() {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const {
      question,
      answer,
      showAnswer,
      showTutorial,
      onClick,
      onTutorialClick,
    } = this.props

    const isMobile = this.state.windowWidth < 600
    const cardClick = isMobile ? onClick : null

    return (
      <React.Fragment>
        {showTutorial && <Tutorial onClick={onTutorialClick} />}
        <div className="questions--wrap" onClick={cardClick}>
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
