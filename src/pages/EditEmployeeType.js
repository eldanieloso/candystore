import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_EMPLOYEE_TYPE } from '../graphql/queries'
import { UPDATE_EMPLOYEE_TYPE } from '../graphql/mutations'

class EditEmployeeType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      employeeType: null,
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      employeeType: {
        ...this.state.employeeType,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      await axiosGraphQL.post('', {
        query: UPDATE_EMPLOYEE_TYPE,
        variables: this.state.employeeType
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Horarios'
    document.getElementById('module__action').innerHTML = 'Editar horario'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    const { id } = this.props.match.params
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEE_TYPE(id) })
      console.log(data)
      let employeeType = data.data.data.typeEmployees[0]
      this.setState({ loading: false, employeeType })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render () {
    if (this.state.redirect) return <Redirect to='/employee-types' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='job' className='col-2 col-form-label'>
              Trabajo
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employeeType.job}
                id='job'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='description' className='col-2 col-form-label'>
              Descripción
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.employeeType.description}
                id='description'
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
                  to='/employee-types'
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

export default EditEmployeeType
