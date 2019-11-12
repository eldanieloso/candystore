import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_EMPLOYEE } from '../graphql/queries'
import { UPDATE_EMPLOYEE } from '../graphql/mutations'

class EditEmployee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      employee: null,
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      employee: {
        ...this.state.employee,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      let employee = { ...this.state.employee }
      employee.salary = parseInt(employee.salary)
      let data = await axiosGraphQL.post('', {
        query: UPDATE_EMPLOYEE,
        variables: employee
      })
      console.log(data)
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Empleados'
    document.getElementById('module__action').innerHTML = 'Editar empleado'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    const { id } = this.props.match.params
    let data = await axiosGraphQL.post('', { query: GET_EMPLOYEE(id) })
    let employee = data.data.data.employees[0]
    employee.schedule = employee.schedule.id
    employee.typeEmployee = employee.typeEmployee.id
    this.setState({ loading: false, employee })
    try {
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render () {
    if (this.state.redirect) return <Redirect to='/employees' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='name' className='col-2 col-form-label'>
              Nombre
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.name}
                id='name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='lastName' className='col-2 col-form-label'>
              Apellido
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.lastName}
                id='lastName'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='address' className='col-2 col-form-label'>
              Dirección
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.address}
                id='address'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='schedule' className='col-2 col-form-label'>
              Horario
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.employee.schedule}
                id='schedule'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='typeEmployee' className='col-2 col-form-label'>
              Tipo de empleado
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.employee.typeEmployee}
                id='typeEmployee'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='startDate' className='col-2 col-form-label'>
              Fecha de inicio
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.startDate}
                id='startDate'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='endDate' className='col-2 col-form-label'>
              Fecha de fin
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.endDate || ''}
                id='endDate'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='status' className='col-2 col-form-label'>
              Status
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employee.status}
                id='status'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='salary' className='col-2 col-form-label'>
              Salary
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.employee.salary}
                id='salary'
              />
            </div>
          </div>
        </div>
        <div className='kt-portlet__foot'>
          <div className='kt-form__actions'>
            <div className='row'>
              <div className='col-2' />
              <div className='col-10'>
                <button
                  type='submit'
                  className='btn btn-brand btn-elevate btn-elevate-air'
                >
                  Guardar
                </button>
                <Link
                  to='/employees'
                  className='btn btn-secondary btn-elevate btn-elevate-air'
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default EditEmployee
