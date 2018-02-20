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

    // if all the questions have been seen, reset and show again.
    if (!questions) {
      questions = this.state.questions.map(obj => (obj.shown = true))
    }

    const nextIndex = Math.floor(Math.random() * (questions.length - 1))
    const updatedQuestions = [...this.state.questions]
    updatedQuestions[nextIndex].shown = true

    this.setState({
      questions: updatedQuestions,
      currentQuestion: updatedQuestions[nextIndex].question,
      currentAnswer: updatedQuestions[nextIndex].answer,
      showAnswer: false,
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
    const { showAbout, currentQuestion, currentAnswer, showAnswer } = this.state

    return (
      <React.Fragment>
        <Header
          showNav={!showAbout}
          onFlipClick={this.handleFlipClick}
          onNextClick={this.handleNextClick}
          onLogoClick={this.handleLogoClick}
          onTitleClick={this.handleTitleClick}
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
