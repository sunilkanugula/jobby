// import {withRouter, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// const Header = props => {
//   const onClickLogout = () => {
//     Cookies.remove('jwt_token')
//     const {history} = props
//     history.replace('/login')
//   }

//   const onclicKwebLogo = () => {
//     const {history} = props
//     history.replace('/')
//   }
//   return (
//     <div className="header-container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//         alt="website logo"
//         className="website-logo"
//         onClick={onclicKwebLogo}
//       />
//       <div className="navigate-container">
//         <Link to="/" className="navigate-list-item">
//           <li>Home</li>
//         </Link>
//         <Link to="/jobs" className="navigate-list-item">
//           <li>Jobs</li>
//         </Link>
//       </div>
//       <button className="logout-button" onClick={onClickLogout}>
//         Logout
//       </button>
//     </div>
//   )
// }
// export default withRouter(Header)

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onclicKwebLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
        onClick={onclicKwebLogo}
      />
      <ul className="navigate-container">
        <li className="navigate-list-item">
          <Link to="/" className="navigate-list-item">
            Home
          </Link>
        </li>
        <li className="navigate-list-item">
          <Link to="/jobs" className="navigate-list-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="logout-button" onClick={onClickLogout}>
        <li>Logout</li>
      </button>
    </div>
  )
}

export default withRouter(Header)
