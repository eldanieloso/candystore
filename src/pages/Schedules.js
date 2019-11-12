import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_SCHEDULES } from '../graphql/queries'

class Schedules extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      schedules: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Horarios'
    document.getElementById('module__action').innerHTML = 'Listado de horarios'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_SCHEDULES })
      let schedules = data.data.data.schedules
      this.setState({ loading: false, schedules })
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
          to='/schedules/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.schedules.map(schedule => {
            return (
              <Link key={schedule.id} to={`/schedules/${schedule.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>
                        Inicio: {schedule.start}
                      </span>
                      <p className='kt-widget5__desc'>
                        Fin: {schedule.finish}
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

export default Schedules
