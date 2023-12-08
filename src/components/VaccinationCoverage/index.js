// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageDetails} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }

    return number.toString()
  }

  return (
    <div className="app-container">
      <h1 className="heading">Vaccination Coverage</h1>

      <BarChart
        data={vaccinationCoverageDetails}
        width={900}
        height={400}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',

            strokeWidth: 1,

            fontSize: 12,

            fontFamily: 'Roboto',
          }}
        />

        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',

            strokeWidth: 0,

            fontSize: 12,

            fontFamily: 'Roboto',
          }}
        />

        <Legend
          wrapperStyle={{
            paddingTop: 30,

            textAlign: 'center',

            fontSize: 12,

            fontFamily: 'Roboto',
          }}
        />

        <Bar dataKey="dose1" name="dose_1" fill="#1f77b4" barSize="20%" />

        <Bar dataKey="dose2" name="dose_2" fill="#fd7f0e" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
