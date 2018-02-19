import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import './styles/normalize.css'
import './styles/reset.css'
import './styles/vars.css'
import './styles/base.css'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
