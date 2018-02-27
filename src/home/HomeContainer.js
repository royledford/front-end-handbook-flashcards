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
      currentCount: 1,
      percentComplete: 0,
      showTutorial: true,
      previousQuestions: [],
    }
    this.updateShownQuestions = this.updateShownQuestions.bind(this)
  }

  async componentDidMount() {
    const questions = await getQuestions()
    questions[0].shown = true

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
      currentQuestion: questions[0],
      showTutorial: showTutorial,
    })
  }

  showNextQuestion = () => {
    this.updatePreviousQuestions(this.state.currentQuestion)

    const questions = this.getUnshownQuestions()
    const question = this.getNextQuestion(questions)

    // Update the main question array to mark a queston as shown

    this.updateShownQuestions(question)
    this.updateQuestionCount(this.state.previousQuestions.length + 1)

    this.setState({
      currentQuestion: question,
      showAnswer: false,
    })
  }

  showPreviousQuestion = () => {
    let lastQuestionId = this.state.currentQuestion._id
    if (this.state.previousQuestions.length > 0) {
      lastQuestionId = this.state.previousQuestions[
        this.state.previousQuestions.length - 1
      ]
    }

    // don't be confused, the ._id is the same as the index for the array
    const question = this.state.questions[lastQuestionId]

    const previousQuestions = [...this.state.previousQuestions]
    previousQuestions.pop()

    this.updateQuestionCount(previousQuestions.length)

    this.setState({
      currentQuestion: question,
      previousQuestions,
      showAnswer: false,
    })
  }

  getUnshownQuestions = () => {
    let unshownQuestions = this.state.questions.filter(obj => !obj.shown)

    if (unshownQuestions.length === 0) {
      unshownQuestions = [...this.state.questions]
      unshownQuestions.forEach(obj => (obj.shown = false))
    }

    return unshownQuestions
  }

  getNextQuestion(questions) {
    const nextIndex = Math.floor(Math.random() * (questions.length - 1))
    return questions[nextIndex]
  }

  updatePreviousQuestions(currentQuestion) {
    let previousQuestions = []
    if (this.state.previousQuestions.length < this.state.questions.length) {
      previousQuestions = [...this.state.previousQuestions]
    }

    previousQuestions.push(currentQuestion._id)
    this.setState({
      previousQuestions,
    })
  }

  updateQuestionCount(currentCount) {
    const percentComplete = currentCount / this.state.questions.length * 100

    this.setState({
      currentCount,
      percentComplete,
    })
  }

  updateShownQuestions(question) {
    const updatedQuestions = this.state.questions.map(q => {
      if (q._id === question._id) {
        q.shown = true
      }
      return q
    })

    this.setState({
      questions: updatedQuestions,
    })
  }

  handleAboutClicked = () => {
    this.setState({ showAbout: false })
  }

  handleBackClick = () => {
    this.showPreviousQuestion()
  }

  handleFlipClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  handleNextClick = () => {
    this.showNextQuestion()
  }

  handleLogoClick = () => {
    this.setState({ showAbout: true })
  }

  handleTutorialClicked = () => {
    localStorage.setItem('showTutorial', 'false')
    this.setState({ showTutorial: false })
  }

  render() {
    const {
      showAbout,
      currentQuestion,
      showAnswer,
      percentComplete,
      showTutorial,
    } = this.state

    return (
      <React.Fragment>
        <Header
          showNav={!showAbout}
          onBackClick={this.handleBackClick}
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
            question={currentQuestion.question}
            answer={currentQuestion.answer}
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
