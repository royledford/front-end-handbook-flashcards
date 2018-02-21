import React from 'react'
import PropTypes from 'prop-types'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progressWidth: 0,
    }

    this.updateProgressWidth = this.updateProgressWidth.bind(this)
  }

  componentDidMount() {
    this.setState({ progressWidth: this.div.offsetWidth })
    window.addEventListener('resize', this.updateProgressWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateProgressWidth)
  }

  updateProgressWidth() {
    this.setState({ progressWidth: this.div.offsetWidth })
  }

  getColor = percent => {
    // if (this.props.percent > 80) return 'green'
    // return this.props.percent > 50 ? 'lightgreen' : 'red'
    return '#7c5423'
  }

  getWidthAsPercentOfTotalWidth = () => {
    const actualWidth = this.state.progressWidth
    return parseInt(actualWidth * (this.props.percent / 100), 10)
  }

  render() {
    const { percent, width, height } = this.props
    return (
      <div
        style={{
          border: 'solid 1px lightgray',
          width: width,
          backgroundColor: '#d6b892',
          height,
        }}
        ref={div => {
          this.div = div
        }}>
        <div
          style={{
            width: this.getWidthAsPercentOfTotalWidth(),
            height,
            backgroundColor: this.getColor(percent),
          }}
        />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  /** Percent of progress completed */
  percent: PropTypes.number.isRequired,

  /** Bar width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /** Bar height */
  height: PropTypes.number,
}

ProgressBar.defaultProps = {
  height: 5,
}

export default ProgressBar
