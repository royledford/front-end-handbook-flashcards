import React, { Component } from 'react'
import About from './About'
import Questions from './Questions'
import Header from '../common/Header/Header'
import { getQuestions } from '../services/github'

export default class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAbout: true,
      showAnswer: false,
      questions: [],
      currentQuestion: '',
      currentAnswer: '',
      currentCount: 1,
      percentComplete: 0,
    }
    this.getNextQuestion = this.getNextQuestion.bind(this)
  }

  async componentDidMount() {
    const questions = await getQuestions()
    questions[0].shown = true

    this.setState({
      questions,
      currentQuestion: questions[0].question,
      currentAnswer: questions[0].answer,
    })
  }

  getNextQuestion = () => {
    let questions = this.state.questions.filter(obj => !obj.shown)
    let currentCount = this.state.currentCount + 1

    // if all the questions have been seen, reset and show again.
    if (!questions) {
      questions = this.state.questions.map(obj => (obj.shown = true))
      currentCount = 1
    }

    const nextIndex = Math.floor(Math.random() * (questions.length - 1))
    const updatedQuestions = [...this.state.questions]
    updatedQuestions[nextIndex].shown = true

    const percentComplete = currentCount / this.state.questions.length * 100

    this.setState({
      questions: updatedQuestions,
      currentQuestion: updatedQuestions[nextIndex].question,
      currentAnswer: updatedQuestions[nextIndex].answer,
      showAnswer: false,
      currentCount,
      percentComplete,
    })
  }

  handleAboutClicked = () => {
    this.setState({ showAbout: false })
  }

  handleFlipClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  handleNextClick = () => {
    this.getNextQuestion()
  }

  handleLogoClick = () => {
    console.log('home')

    this.setState({ showAbout: true })
  }

  handleTitleClick = () => {}

  render() {
    const {
      showAbout,
      currentQuestion,
      currentAnswer,
      showAnswer,
      percentComplete,
    } = this.state

    return (
      <React.Fragment>
        <Header
          showNav={!showAbout}
          onFlipClick={this.handleFlipClick}
          onNextClick={this.handleNextClick}
          onLogoClick={this.handleLogoClick}
          onTitleClick={this.handleTitleClick}
          percentComplete={percentComplete}
        />
        {showAbout ? (
          <About onClick={this.handleAboutClicked} />
        ) : (
          <Questions
            question={currentQuestion}
            answer={currentAnswer}
            showAnswer={showAnswer}
            onClick={this.handleFlipClick}
          />
        )}
      </React.Fragment>
    )
  }
}
