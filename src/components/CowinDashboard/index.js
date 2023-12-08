// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusComponent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusComponent.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState = {apiStatus: apiStatusComponent.inProgress}

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(age => ({
          age: age.age,
          count: age.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(gender => ({
          count: gender.count,
          gender: gender.gender,
        })),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusComponent.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusComponent.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="heading">Something went wrong</h1>
    </div>
  )

  renderVaccinationState = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusComponent.success:
        return this.renderVaccinationState()
      case apiStatusComponent.failure:
        return this.renderFailureView()
      case apiStatusComponent.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="website-container">
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
              alt="website logo"
            />
            <h1 className="logo-name">Co-WIN</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderViewBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
