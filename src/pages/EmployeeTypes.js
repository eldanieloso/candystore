import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_EMPLOYEE_TYPES, GET_EMPLOYEE_TYPE } from '../graphql/queries'
import { DELETE_EMPLOYEE_TYPE } from '../graphql/mutations'

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

  deleteEmployeeType = async (event, id) => {
    event.preventDefault()
    if (this.state.employeeTypes.length === 1) {
      return alert('Debe haber al menos un tipo de empleado')
    }
    let newId = prompt(
      'Ingresa el nuevo id del tipo de empleado que tendrán los empleados del tipo que estás eliminando'
    )
    let isValidId = await this.validateId(newId)
    if (id === newId || !isValidId) {
      return alert('El ID que ingresaste no es válido')
    }

    try {
      let data = await axiosGraphQL.post('', {
        query: DELETE_EMPLOYEE_TYPE,
        variables: { id, newId }
      })
      if (data.data.errors) alert('Verifica la información')
      this.fetchData()
    } catch (error) {
      alert('Verifica la información')
      this.setState({ loading: false, error })
    }
  }

  validateId = async id => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEE_TYPE(id) })
      if (data.data.errors) return false
      return true
    } catch (error) {
      return false
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
                        ID: {employeeType.id}
                        <br />
                        {employeeType.description}
                      </p>
                    </div>
                  </div>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__stats'>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-elevate btn-pill'
                        onClick={e =>
                          this.deleteEmployeeType(e, employeeType.id)
                        }
                      >
                        Eliminar
                      </button>
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

export default EmployeeTypes
