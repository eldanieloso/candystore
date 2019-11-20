import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_SCHEDULE } from '../graphql/mutations'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class CreateSchedule extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      schedule: {
        start: new Date(),
        finish: new Date()
      },
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
      let newSchedule = {...this.state.schedule}
      newSchedule.start = moment(newSchedule.start).format('HH:mm:ss')
      newSchedule.finish = moment(newSchedule.finish).format('HH:mm:ss')
      await axiosGraphQL.post('', {
        query: CREATE_SCHEDULE,
        variables: newSchedule
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Horarios'
    document.getElementById('module__action').innerHTML = 'Crear horario'
  }

  setStart (time) {
    let newSchedule = { ...this.state.schedule }
    newSchedule.start = time
    this.setState({ schedule: newSchedule })
  }

  setFinish (time) {
    let newSchedule = { ...this.state.schedule }
    newSchedule.finish = time
    this.setState({ schedule: newSchedule })
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
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Hora'
                dateFormat='HH:mm:ss'
                onChange={time => this.setStart(time)}
                className='form-control'
                id='start'
                selected={this.state.schedule.start}
                withPortal
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='finish' className='col-2 col-form-label'>
              Fin
            </label>
            <div className='col-10'>
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Hora'
                dateFormat='HH:mm:ss'
                onChange={time => this.setFinish(time)}
                className='form-control'
                id='finish'
                selected={this.state.schedule.finish}
                withPortal
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

export default CreateSchedule
