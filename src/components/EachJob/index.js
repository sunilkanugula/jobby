import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSuitcase, FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class EachJob extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getSelectedJob()
  }

  getFormattedData = data => {
    const formattedData = {
      id: data.id,
      title: data.title,
      rating: data.rating,
      location: data.location,
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      jobDescription: data.job_description,
      packagePerAnnum: data.package_per_annum,
      companyWebsiteUrl: data.company_website_url,
    }
    return formattedData
  }

  getSelectedJob = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    const {job_details} = data

    const lifeAtCompanyObj = data.job_details.life_at_company
    console.log(data)
    const formattedLifeAtCompany = {
      imageUrl: lifeAtCompanyObj.image_url,
      description: lifeAtCompanyObj.description,
    }

    const formattedData = this.getFormattedData(data.job_details)
    const formattedDataSimilarJobsList = data.similar_jobs.map(each =>
      this.getFormattedData(each),
    )
    const fomrattedSkills = job_details.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    this.setState({
      jobDetails: formattedData,
      skills: fomrattedSkills,
      lifeAtCompany: formattedLifeAtCompany,
      similarJobs: formattedDataSimilarJobsList,
      isLoading: false,
    })
  }

  renderSkills = each => {
    const {imageUrl, name} = each
    return (
      <li className="each-skill-container">
        <img src={imageUrl} className="skills-img" />
        <p>{name}</p>
      </li>
    )
  }

  renderEachInfo = () => {
    const {jobDetails, skills, lifeAtCompany} = this.state

    const {
      id,
      title,
      rating,
      location,
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-details">
        <div className="each-job-details">
          <div className="company-job-role-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="each-company-logo"
            />
            <div className="title-rating-container">
              <h3 className="company-title">{title}</h3>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-Salary-contianer">
            <div className="location-job-type-container">
              <div className="location-container">
                <IoLocationSharp className="react-icons" />
                <p>{location}</p>
              </div>
              <div className="salary-contianer">
                <FaSuitcase className="react-icons" />
                <p>{employmentType}</p>
              </div>
            </div>

            <p className="salary-lpa">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="description-websitr-url-cotnainer">
            <h3>Description</h3>
            <a href={companyWebsiteUrl} className="anchor-tag-for-compay-link">
              Visit <FaExternalLinkAlt />
            </a>
          </div>

          <p className="job-description">{jobDescription}</p>
          <h3>Skills</h3>
          <div className="skills-container">
            {skills.map(each => this.renderSkills(each))}
          </div>
          <h3>Life at company</h3>
          <div className="life-at-company-container">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} className="life-at-company-img" />
          </div>
        </div>
      </div>
    )
  }

  rendereachSimilarJob = each => {
    const {
      id,
      title,
      rating,
      location,
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
    } = each

    return (
      <div className="each-similar-job-container">
        <div className="company-job-role-container">
          <img src={companyLogoUrl} className="each-company-logo" />
          <div className="title-rating-container">
            <h3 className="company-title">{title}</h3>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderData = () => {
    const {similarJobs, isLoading} = this.state
    return (
      <>
        <div>{this.renderEachInfo()}</div>
        <h1 className="similar-jobs-main-heading">Similar Jobs</h1>
        <div className="similar-jobs-contaner">
          {similarJobs.map(each => this.rendereachSimilarJob(each))}
        </div>
      </>
    )
  }

  render() {
    const {similarJobs, isLoading} = this.state
    return (
      <div className="bg-job-details">
        <Header />
        {isLoading ? this.renderLoader() : this.renderData()}
      </div>
    )
  }
}

export default EachJob
