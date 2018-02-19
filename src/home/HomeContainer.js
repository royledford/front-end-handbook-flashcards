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
  }

  componentDidMount() {
    getQuestions()
    this.setState({
      currentQuestion:
        '# This is Markdown\n\n#### You can edit me!\n\n```some code```',
      currentAnswer: '# This is the answer\n\n#### You can edit me!',
    })
  }

  handleAboutClicked = () => {
    this.setState({ showAbout: false })
  }

  handleFlipClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  handleNextClick = () => {}

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
          />
        )}
      </React.Fragment>
    )
  }
}
