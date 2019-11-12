import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_EMPLOYEE_TYPES } from '../graphql/queries'

class EmployeeTypes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      employeeTypes: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Tipos de empleado'
    document.getElementById('module__action').innerHTML =
      'Listado de tipos de empleado'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEE_TYPES })
      let employeeTypes = data.data.data.typeEmployees
      this.setState({ loading: false, employeeTypes })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error...'
    return (
      <React.Fragment>
        <Link
          to='/employee-types/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.employeeTypes.map(employeeType => {
            return (
              <Link
                key={employeeType.id}
                to={`/employee-types/${employeeType.id}`}
              >
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>
                        {employeeType.job}
                      </span>
                      <p className='kt-widget5__desc'>
                        {employeeType.description}
                      </p>
                    </div>
                  </div>
                  <div className='kt-widget5__content' />
                </div>
              </Link>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default EmployeeTypes
