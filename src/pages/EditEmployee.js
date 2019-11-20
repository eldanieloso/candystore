import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import {
  GET_EMPLOYEE,
  GET_SCHEDULES,
  GET_EMPLOYEE_TYPES
} from '../graphql/queries'
import { UPDATE_EMPLOYEE } from '../graphql/mutations'
import timestampToDate from 'timestamp-to-date'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class EditEmployee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      employee: null,
      schedules: [],
      employeeTypes: [],
      redirect: false
    }
    this.getSchedules()
    this.getEmployeeTypes()
  }

  getSchedules = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_SCHEDULES })
      let schedules = data.data.data.schedules
      this.setState({ schedules })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  getEmployeeTypes = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEE_TYPES })
      let employeeTypes = data.data.data.typeEmployees
      this.setState({ employeeTypes })
    } catch (error) {
      this.setState({ error: true })
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
      await axiosGraphQL.post('', {
        query: UPDATE_EMPLOYEE,
        variables: employee
      })
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
    employee.startDate = new Date(timestampToDate(employee.startDate, 'yyyy/MM/dd'))
    employee.endDate = new Date(timestampToDate(employee.endDate, 'yyyy/MM/dd'))
    this.setState({ loading: false, employee })
    try {
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  setStartDate (date) {
    let newEmployee = { ...this.state.employee }
    newEmployee.startDate = date
    this.setState({ employee: newEmployee })
  }

  setEndDate (date) {
    let newEmployee = { ...this.state.employee }
    newEmployee.endDate = date
    this.setState({ employee: newEmployee })
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
              <select
                onChange={this.handleChange}
                className='form-control'
                id='schedule'
                defaultValue={this.state.employee.id}
              >
                {this.state.schedules.map(schedule => {
                  return (
                    <option key={schedule.id} value={schedule.id}>{`${
                      schedule.start
                    } - ${schedule.finish}`}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='typeEmployee' className='col-2 col-form-label'>
              Tipo de empleado
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='typeEmployee'
                defaultValue={this.state.employee.typeEmployee}
              >
                {this.state.employeeTypes.map(employeeType => {
                  return (
                    <option key={employeeType.id} value={employeeType.id}>
                      {employeeType.job}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='startDate' className='col-2 col-form-label'>
              Fecha de inicio
            </label>
            <div className='col-10'>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                onChange={date => this.setStartDate(date)}
                className='form-control'
                id='startDate'
                selected={this.state.employee.startDate}
                withPortal
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='endDate' className='col-2 col-form-label'>
              Fecha de fin
            </label>
            <div className='col-10'>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                onChange={date => this.setEndDate(date)}
                className='form-control'
                id='endDate'
                selected={this.state.employee.endDate}
                withPortal
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='status' className='col-2 col-form-label'>
              Status
            </label>
            <div className='col-10'>
              <select
                className='form-control'
                id='status'
                onChange={this.handleChange}
                defaultValue={this.state.employee.status}
              >
                <option value='Active'>Activo</option>
                <option value='Inactive'>Inactivo</option>
              </select>
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
