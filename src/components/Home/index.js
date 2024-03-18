import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => (
  <div className="home-bg-container">
    <Header />
    <div className="home-inner-container">
      <h1>
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="paragragh-content">
        Millions of people are searching for jobs, salary Information, <br />{' '}
        company reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-jobs-button">Find Jobs</button>
      </Link>
    </div>
  </div>
)

export default Home
