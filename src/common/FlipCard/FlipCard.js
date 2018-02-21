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

  componentWillReceiveProps(nextProps) {
    // When a long answer is showing and you flip the card
    // the question is off the screen. The will scroll it
    // back into view.
    if (!nextProps.showAnswer) this.cardWrap.scrollTop = 0
  }

  render() {
    const { frontText, backText, showAnswer } = this.props

    const flipCard = showAnswer ? 'flipcard--flipped' : ''

    // force question cards to not scroll.
    const noScroll = showAnswer ? 'flipcard--container-overflow' : ''

    return (
      <div
        // className={`flipcard--container`}
        className={`flipcard--container ${noScroll}`}
        ref={div => {
          this.cardWrap = div
        }}>
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
