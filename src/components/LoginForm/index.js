import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: '', errorMsg: ''}

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccessfull = jwtToken => {
    this.setState({username: '', password: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => this.setState({showSubmitError: true, errorMsg})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiURl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiURl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccessfull(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              type="input"
              id="username"
              onChange={this.onchangeUsername}
              value={username}
            />
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              onChange={this.onchangePassword}
              value={password}
            />
            <button className="submit-button" type="submit">
              Submit
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
