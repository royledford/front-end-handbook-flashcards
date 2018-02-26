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
      showTutorial: true,
    }
    this.loadNextQuestion = this.loadNextQuestion.bind(this)
    this.getNextQuestion = this.getNextQuestion.bind(this)
  }

  async componentDidMount() {
    const questions = await getQuestions()
    questions[0].shown = true

    // get tutorial flag from local storage
    let showTutorial = localStorage.getItem('showTutorial')
    if (showTutorial === null) {
      showTutorial = true
    } else if (showTutorial === 'false') {
      showTutorial = false
    } else {
      showTutorial = true
    }

    this.setState({
      questions,
      currentQuestion: questions[0].question,
      currentAnswer: questions[0].answer,
      showTutorial: showTutorial,
    })
  }

  loadNextQuestion = () => {
    let questions = this.state.questions.filter(obj => !obj.shown)
    let nextIndex = 0
    let currentCount = 1

    if (questions.length > 0) {
      nextIndex = Math.floor(Math.random() * (questions.length - 1))
      currentCount = this.state.currentCount + 1
    } else {
      // All questions have been seen so start over.
      questions = [...this.state.questions]
      questions.forEach(obj => (obj.shown = false))
    }

    const nextQuestion = questions[nextIndex]

    // Update the main question array to mark a queston as shown
    const updatedQuestions = this.state.questions.map(q => {
      if (q._id === nextQuestion._id) {
        q.shown = true
      }
      return q
    })

    const percentComplete = currentCount / this.state.questions.length * 100
    console.log(
      `QuestionsCount: ${questions.length}, currentCount: ${currentCount}`
    )

    this.setState({
      questions: updatedQuestions,
      currentQuestion: nextQuestion.question,
      currentAnswer: nextQuestion.answer,
      showAnswer: false,
      currentCount,
      percentComplete,
    })
  }

  getNextQuestion() {}

  handleAboutClicked = () => {
    this.setState({ showAbout: false })
  }

  handleFlipClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  handleNextClick = () => {
    this.loadNextQuestion()
  }

  handleLogoClick = () => {
    console.log('home')

    this.setState({ showAbout: true })
  }

  handleTutorialClicked = () => {
    localStorage.setItem('showTutorial', 'false')
    this.setState({ showTutorial: false })
  }

  handleTitleClick = () => {}

  render() {
    const {
      showAbout,
      currentQuestion,
      currentAnswer,
      showAnswer,
      percentComplete,
      showTutorial,
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
            showTutorial={showTutorial}
            onClick={this.handleFlipClick}
            onTutorialClick={this.handleTutorialClicked}
          />
        )}
      </React.Fragment>
    )
  }
}
