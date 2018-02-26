import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import './CardContent.css'

export default class CardContent extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }
  render() {
    const markdownOptions = {
      overrides: {
        a: {
          props: {
            target: '_blank',
          },
        },
      },
    }

    return (
      <div className="cardcontent--wrap">
        <div className="cardcontent--content">
          <Markdown options={markdownOptions}>{this.props.text}</Markdown>
        </div>
      </div>
    )
  }
}
