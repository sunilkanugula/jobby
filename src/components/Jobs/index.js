import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobsList from '../JobsList'

import './index.css'

class Jobs extends Component {
  state = {
    searchInput: '',
    profileDetails: {},
    jobs: [],
    fulltime: '',
    internship: '',
    freelance: '',
    partime: '',
    minimumPackage: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getFilterJobsList()
  }

  getProfileDetails = async () => {
    console.log(Cookies.get('jwt_token'))
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    const profileObjeact = data.profile_details
    const fomrattedData = {
      profileImageUrl: profileObjeact.profile_image_url,
      shortBio: profileObjeact.short_bio,
      name: profileObjeact.name,
    }

    this.setState({profileDetails: fomrattedData})
  }

  getFilterJobsList = async () => {
    this.setState({isLoading: true})
    const {
      fulltime,
      freelance,
      internship,
      partime,
      minimumPackage,
      searchInput,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${
      (fulltime, partime, freelance, internship)
    }&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    const jobsListDetails = data
    const {jobs} = jobsListDetails
    const formattedData = jobs.map(each => ({
      id: each.id,
      title: each.title,
      rating: each.rating,
      location: each.location,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      packagePerAnnum: each.package_per_annum,
    }))
    this.setState({jobs: formattedData, isLoading: false})
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="username">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  onClickFulltime = e => {
    const {fulltime} = this.state
    if (fulltime === '') {
      this.setState({fulltime: e.target.value})
    } else {
      this.setState({fulltime: ''})
    }
    return this.getFilterJobsList()
  }

  onClickParttime = e => {
    const {partime} = this.state
    if (partime === '') {
      this.setState({partime: e.target.value})
    } else {
      this.setState({partime: ''})
    }
    return this.getFilterJobsList()
  }

  onClickFreelance = e => {
    const {freelance} = this.state
    if (freelance === '') {
      this.setState({freelance: e.target.value})
    } else {
      this.setState({freelance: ''})
    }
    return this.getFilterJobsList()
  }

  onClickIntership = e => {
    const {internship} = this.state
    if (internship === '') {
      this.setState({internship: e.target.value})
    } else {
      this.setState({internship: ''})
    }
    return this.getFilterJobsList()
  }

  onchangeSearchInput = e => this.setState({searchInput: e.target.value})

  onClckSearchButton = () => {
    const {searchInput} = this.state

    console.log(searchInput)
    return this.getFilterJobsList()
  }

  renderCheckBoxContainer = () => (
    <div className="checkbox-container">
      <h1>Type of Employment</h1>
      <div className="each-checkbox-container">
        <input
          type="checkbox"
          id="fulltime"
          value="FULLTIME"
          onClick={this.onClickFulltime}
        />
        <label htmlFor="fulltime" className="input-label">
          Fulltime
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          type="checkbox"
          id="partTime"
          value="PARTTIME"
          onClick={this.onClickParttime}
        />
        <label htmlFor="partTime" className="input-label">
          PartTime
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          type="checkbox"
          id="freelance"
          value="FREELANCE"
          onClick={this.onClickFreelance}
        />
        <label htmlFor="freelance" className="input-label">
          Freelance
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          className="input-checkbox"
          type="checkbox"
          id="intership"
          value="INTERNSHIP"
          onClick={this.onClickIntership}
        />
        <label htmlFor="intership" className="input-label">
          Intership
        </label>
        <br />
      </div>
    </div>
  )

  onClickMinimumPackage = e => {
    this.setState({minimumPackage: e.target.value}, this.getFilterJobsList)
  }

  renderSelectionOptions = () => (
    <div className="selection-options-contianer">
      <h1>Salary Range</h1>
      <div className="each-checkbox-container">
        <input
          name="lpa"
          type="radio"
          value="1000000"
          id="10lpa"
          onClick={this.onClickMinimumPackage}
        />
        <label htmlFor="10lpa" className="input-label">
          10 LPA and above
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          name="lpa"
          type="radio"
          value="2000000"
          id="20lpa"
          onClick={this.onClickMinimumPackage}
        />
        <label htmlFor="20lpa" className="input-label">
          20 LPA and above
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          type="radio"
          name="lpa"
          value="3000000"
          id="30lpa"
          onClick={this.onClickMinimumPackage}
        />
        <label htmlFor="30lpa" className="input-label">
          30 LPA and above
        </label>
        <br />
      </div>
      <div className="each-checkbox-container">
        <input
          name="lpa"
          type="radio"
          value="4000000"
          id="40lpa"
          onClick={this.onClickMinimumPackage}
        />
        <label htmlFor="40lpa" className="input-label">
          40 LPA and above
        </label>
        <br />
      </div>
    </div>
  )

  renderFilterList = () => {
    const {jobs} = this.state
    const filteredList = jobs.map(each => (
      <JobsList each={each} key={each.id} />
    ))
    return filteredList
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {jobs, fulltime, partime, isLoading} = this.state
    console.log(isLoading, 'hii')
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-inner-container">
          <div className="profile-customize-container">
            {this.renderProfileDetails()}
            <hr className="horizontal-line" />
            {this.renderCheckBoxContainer()}
            <hr className="horizontal-line" />
            {this.renderSelectionOptions()}
          </div>
          <div className="jobs-list-container">
            <div className="search-input-container">
              <input
                placeholder="Search"
                className="search-input"
                type="search"
                onChange={this.onchangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClckSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isLoading ? this.renderLoader() : this.renderFilterList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

// {isLoading ? this.renderLoader() : this.renderFilterList()}
