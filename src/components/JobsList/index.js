import {IoLocationSharp} from 'react-icons/io5'
import {FaSuitcase, FaStar} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'

const JobsList = props => {
  const {each} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = each

  const onClickEachJob = () => {
    const {history} = props
    history.push(`/jobs/${id}`)
  }

  return (
    <div className="each-job-details" key={id} onClick={onClickEachJob}>
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
          {' '}
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
      <h3>Description</h3>
      <p>{jobDescription}</p>
    </div>
  )
}

export default withRouter(JobsList)
