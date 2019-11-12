import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_SCHEDULE } from '../graphql/queries'
import { UPDATE_SCHEDULE } from '../graphql/mutations'

class EditSchedule extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      schedule: null,
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      schedule: {
        ...this.state.schedule,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      await axiosGraphQL.post('', {
        query: UPDATE_SCHEDULE,
        variables: this.state.schedule
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
      let data = await axiosGraphQL.post('', { query: GET_SCHEDULE(id) })
      console.log(data)
      let schedule = data.data.data.schedules[0]
      this.setState({ loading: false, schedule })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render () {
    if (this.state.redirect) return <Redirect to='/schedules' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='start' className='col-2 col-form-label'>
              Inicio
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.schedule.start}
                id='start'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='finish' className='col-2 col-form-label'>
              Fin
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.schedule.finish}
                id='finish'
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
                  to='/providers'
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

export default EditSchedule
