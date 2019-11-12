import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_EMPLOYEES } from '../graphql/queries'

class Employees extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      employees: []
    }
  }
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Empleados'
    document.getElementById('module__action').innerHTML = 'Listado de empleados'
    this.fetchData()
  }
  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEES })
      let employees = data.data.data.employees
      this.setState({ loading: false, employees })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }
  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <React.Fragment>
        <Link
          to='/employees/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.employees.map(employee => {
            return (
              <Link key={employee.id} to={`/employees/${employee.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>
                        {`${employee.name} ${employee.lastName}`}
                      </span>
                      <p className='kt-widget5__desc'>{employee.address}</p>
                      <div className='kt-widget5__info'>
                        <span>{employee.typeEmployee.job}</span>
                      </div>
                    </div>
                  </div>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        {employee.status}
                      </span>
                      <span className='kt-widget5__sales'>status</span>
                    </div>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        {employee.salary}
                      </span>
                      <span className='kt-widget5__votes'>salary</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Employees
